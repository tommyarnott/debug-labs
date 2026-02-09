<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let projects = [];
	let currentIndex = -1;
	let currentProject = null;
	let prevProject = null;
	let nextProject = null;

	$: projectSlug = $page.params.slug;
	$: iframeSrc = currentProject?.iframe ? `/dist/${currentProject?.iframe}`   : `/dist/${projectSlug}/index.html`;

	$: {
		if (projects.length > 0 && projectSlug) {
			currentIndex = projects.findIndex(p => p.slug === projectSlug);
			if (currentIndex !== -1) {
				currentProject = projects[currentIndex];
				prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
				nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];
			}
		}
	}

	onMount(async () => {
		const response = await fetch('/json/projects.json');
		projects = await response.json();
	});
</script>

<div class="project-container">
	{#if currentProject}
		<header class="project-header bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
			<a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
				<img src="/img/debug-logo-white.png" alt="Debug Logo" class="h-5 w-auto logo-filter" />
				<h1 class="text-sm font-light tracking-widest text-gray-900 dark:text-white">. LABS</h1>
			</a>

			<div class="flex items-center gap-3">
				<div class="text-sm font-light text-gray-600 dark:text-gray-300">
					{currentProject.title}
				</div>
				<div class="flex gap-2">
					{#each currentProject.tags as tag}
						<a
							href="/?tag={encodeURIComponent(tag)}"
							class="px-3 py-1 text-xs font-normal bg-blue-100 dark:bg-pink-700 text-blue-800 dark:text-white rounded-full hover:opacity-80 transition-opacity"
						>
							{tag}
						</a>
					{/each}
				</div>
			</div>

			<div class="flex items-center gap-4">
				{#if prevProject}
					<a href="/project/{prevProject.slug}" class="text-sm font-light tracking-widest uppercase text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
						← Prev
					</a>
				{/if}
				{#if nextProject}
					<a href="/project/{nextProject.slug}" class="text-sm font-light tracking-widest uppercase text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
						Next →
					</a>
				{/if}
				<a href="/" class="text-sm font-light tracking-widest uppercase text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
					Home
				</a>
			</div>
		</header>
	{/if}

	<iframe
		src={iframeSrc}
		title="Project: {projectSlug}"
	></iframe>
</div>

<style>
	.project-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
	}

	.project-header {
		height: 48px;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-shrink: 0;
	}

	iframe {
		flex: 1;
		width: 100%;
		border: none;
		display: block;
	}
</style>
