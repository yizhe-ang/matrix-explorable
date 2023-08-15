<script>
	export let title;

  // TODO: Animate this in
</script>

<h3 class="-mb-10 mt-0 font-sansAlt text-8xl text-neutral">{title}</h3>
<div class="alert backdrop-blur-0 bg-transparent border-0">
	<slot />
</div>

<style lang="postcss">
	div:before {
		content: "";
		z-index: -1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: linear-gradient(
			-45deg,
			var(--start-color) 0%,
			var(--end-color) 100%
		);
		/* transform: translate3d(0px, 20px, 0) scale(0.95); */
		transform: translate3d(0px, 0px, 0) scale(0.95);
		filter: blur(20px);
		opacity: 0.5;
		/* opacity: 0.5; */
		transition: opacity 0.3s;
		border-radius: inherit;
	}

	div::after {
		content: "";
		z-index: -1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: inherit;
		border-radius: inherit;
	}
</style>
