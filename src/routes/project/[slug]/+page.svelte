<script>
	import { page } from '$app/stores';

	$: projectSlug = $page.params.slug;
	$: iframeSrc = `/dist/${projectSlug}/index.html`;
</script>

<iframe
	src={iframeSrc}
	title="Project: {projectSlug}"
></iframe>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
		display: block;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
