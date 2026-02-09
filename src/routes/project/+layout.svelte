<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	onMount(() => {
		if (browser) {
			document.documentElement.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
			document.documentElement.style.height = '100%';
			document.body.style.height = '100%';
		}
	});

	onDestroy(() => {
		if (browser) {
			document.documentElement.style.overflow = '';
			document.body.style.overflow = '';
			document.documentElement.style.height = '';
			document.body.style.height = '';
		}
	});
</script>

<slot />
