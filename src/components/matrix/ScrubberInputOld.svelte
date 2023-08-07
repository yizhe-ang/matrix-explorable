<script>
	import { playhead } from "$stores";
	import { createSlider } from "@melt-ui/svelte";

	const { slider, range, thumb, value } = createSlider({
		value: [0]
		// min: 0,
		// max: 1,
		// step: 0.1
	});
</script>

<!-- <span melt={$slider} class="slider">
	<span class="block">
		<span melt={$range} class="range" />
	</span>
	<span melt={$thumb()} class="thumb" />
</span> -->

<span melt={$slider} class="relative flex h-[20px] w-[200px] items-center">
	<span class="block h-[3px] w-full bg-black/40">
		<span melt={$range} class="h-[3px] bg-white" />
	</span>
	<span
		melt={$thumb()}
		class="block h-5 w-5 rounded-full bg-white focus:ring-4 focus:ring-black/40"
	/>
</span>

<style lang="postcss">
	/* .slider {
		position: relative;
		display: flex;
		height: 20px;
		width: 200px;
		align-items: center;
	}

	.block {
		height: 3px;
		width: 100%;
		background-color: white;
	}

	.range {
		height: 3px;
		background-color: black;
	}

	.thumb {
		display: block;
		height: 1.25rem;
		width: 1.25rem;
		border-radius: 9999px;
		background: white;
	}

	.thumb:focus {
		box-shadow: 0 0 0 calc(4px) blue;
	} */
</style>
