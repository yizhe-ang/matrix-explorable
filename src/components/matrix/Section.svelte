<script>
	export let id = null;
</script>

<section {id} class="prose prose-xl [&>*]:px-10 mb-60">
	<slot />
</section>

<style lang="postcss">
	section :global(.active) {
		/* @apply bg-gradient-to-l from-neutral via-base-100 via-5%; */
		@apply bg-gradient-to-l from-neutral to-10%;
		/* @apply bg-gradient-to-l from-neutral; */
		/* @apply bg-base-100; */
		/* @apply border-r-[20px] border-neutral; */
	}
</style>
