<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let projects = [];
	let selectedTags = [];
	let allTags = [];

	// Watch for URL changes and update selected tags
	$: {
		const urlTags = $page.url.searchParams.getAll('tag');
		if (urlTags.length > 0) {
			selectedTags = urlTags;
		} else {
			selectedTags = [];
		}
	}

	onMount(async () => {
		const response = await fetch('/json/projects.json');
		projects = await response.json();

		// Extract all unique tags
		const tagSet = new Set();
		projects.forEach(project => {
			project.tags.forEach(tag => tagSet.add(tag));
		});
		allTags = Array.from(tagSet).sort();

		// Check for tags in URL on initial load
		const urlTags = $page.url.searchParams.getAll('tag');
		if (urlTags.length > 0) {
			selectedTags = urlTags;
		}
	});

	function toggleTag(tag) {
		let newTags;
		if (selectedTags.includes(tag)) {
			newTags = selectedTags.filter(t => t !== tag);
		} else {
			newTags = [...selectedTags, tag];
		}

		// Update URL with all selected tags
		if (newTags.length === 0) {
			goto('/', { replaceState: true });
		} else {
			const params = newTags.map(t => `tag=${encodeURIComponent(t)}`).join('&');
			goto(`/?${params}`, { replaceState: true });
		}
	}

	$: filteredProjects = (() => {
		if (selectedTags.length === 0) {
			return projects;
		}

		// Filter and score projects
		const scored = projects
			.map(project => {
				const matchCount = project.tags.filter(tag => selectedTags.includes(tag)).length;
				return { project, matchCount };
			})
			.filter(item => item.matchCount > 0)
			.sort((a, b) => b.matchCount - a.matchCount);

		return scored.map(item => item.project);
	})();
</script>

<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
	<div class="px-4 py-3">
		<a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
			<img src="/img/debug-logo-white.png" alt="Debug Logo" class="h-5 w-auto logo-filter" />
			<h1 class="text-sm font-light tracking-widest text-gray-900 dark:text-white m-0">. LABS</h1>
		</a>
	</div>

	<div class="container mx-auto px-4 pb-8 max-w-7xl">
		<header class="mb-12">
			{#if selectedTags.length > 0}
				<p class="text-xl font-normal text-gray-600 dark:text-gray-100">
					Experimental projects, thoughts and creative coding experiments tagged with <span class="text-pink-700 dark:text-pink-400">{selectedTags.join(', ')}</span>
				</p>
			{:else}
				<p class="text-xl font-normal text-gray-600 dark:text-gray-100">Experimental projects, thoughts and creative coding experiments</p>
			{/if}
		</header>

		{#if allTags.length > 0}
			<div class="mb-8">
				<h3 class="text-sm font-light tracking-widest uppercase text-gray-900 dark:text-white mb-4">Filter by tags:</h3>
				<div class="flex flex-wrap gap-2">
					{#each allTags as tag}
						<button
							on:click={() => toggleTag(tag)}
							class="px-4 py-2 rounded-full text-sm font-normal transition-all duration-200 {selectedTags.includes(tag)
								? 'bg-pink-700 text-white shadow-md'
								: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}"
						>
							{tag}
						</button>
					{/each}
				</div>
				{#if selectedTags.length > 0}
					<button
						on:click={() => goto('/')}
						class="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
					>
						Clear all filters
					</button>
				{/if}
			</div>
		{/if}

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredProjects as project}
				<a
					href="/project/{project.slug}"
					class="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-600"
				>
					<div class="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
						<img
							src={project.img}
							alt={project.title}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
						/>
					</div>

					<div class="p-6">
						<h2 class="text-2xl font-normal mb-2 transition-colors text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:!text-blue-300">
							{project.title}
						</h2>

						<p class="font-light text-gray-600 dark:text-gray-100 mb-4 line-clamp-2">
							{project.description}
						</p>

						<div class="flex flex-wrap gap-2 mb-4">
							{#each project.tags as tag}
								<span class="px-3 py-1 text-xs font-normal bg-blue-100 dark:bg-pink-700 text-blue-800 dark:text-white rounded-full">
									{tag}
								</span>
							{/each}
						</div>

						<div class="flex gap-3 text-sm">
							{#if project.gitrepo}
								<span class="text-gray-500 dark:text-gray-300 flex items-center gap-1">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
										<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
									</svg>
									GitHub
								</span>
							{/if}
							{#if project.download}
								<span class="text-gray-500 dark:text-gray-300 flex items-center gap-1">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
									</svg>
									Download
								</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>

		<footer class="mt-20 pt-8 pb-12 border-t border-gray-200 dark:border-gray-700">
			<div class="text-center">
				<p class="text-sm font-light tracking-wide text-gray-600 dark:text-gray-400 mb-3">
					An experimental playground by
				</p>
				<a
					href="https://debug.io"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block text-2xl font-light uppercase text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
					style="letter-spacing: 0.25em;"
				>
					DEBUG
				</a>
			</div>
		</footer>
	</div>
</div>
