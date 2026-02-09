<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	onMount(() => {
		// Initialize theme on mount
		if ($theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// Apply Avenir font to body
		document.body.style.fontFamily = "var(--font-avenir)";
	});
</script>

<svelte:head>
	<style>
		:global(body) {
			font-family: var(--font-avenir);
		}
	</style>
</svelte:head>

<ThemeToggle />
<slot />
