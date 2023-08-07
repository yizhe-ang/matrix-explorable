<script>
	// TODO: Arcade controls aesthetic here?
	// Look at Josh for inspiration
	// TODO: Toggle overlay grids

	import { createToggleGroup, melt } from "@melt-ui/svelte";
	import { Grid, ScatterChart } from "lucide-svelte";

	const size = 36;

	const {
		elements: { root, item },
		states: { value },
    helpers: { isPressed },
	} = createToggleGroup({
		type: "multiple"
	});

	// $: console.log($value);
  // $: console.log($isPressed('points'))
</script>

<div
	use:melt={$root}
	class="flex items-center data-[orientation='vertical']:flex-col"
	aria-label="Toggle visibility of elements"
>
	<!-- Toggle grid -->
	<button class="toggle-item" use:melt={$item("grid")} aria-label="Show grid">
		<Grid {size} />
	</button>

	<!-- Toggle transformed grid -->
	<button
		class="toggle-item"
		use:melt={$item("transformed grid")}
		aria-label="Show transformed grid"
	>
		<Grid {size} />
	</button>

	<!-- Toggle points -->
	<button
		class="toggle-item"
		use:melt={$item("points")}
		aria-label="Show points"
	>
		<ScatterChart {size} />
	</button>
</div>

<style lang="postcss">
	.toggle-item {
		display: grid;
		place-items: center;
		align-items: center;
		outline: none;

		@apply h-14 w-14 bg-base-300 transition-colors;

		&:hover {
			@apply bg-base-100;
		}
	}

	.toggle-item[data-disabled] {
		@apply cursor-not-allowed;
	}

	.toggle-item[data-orientation="horizontal"] {
		@apply border-x-2 border-l-transparent border-r-neutral;

		&:first-child {
			@apply rounded-l;
		}

		&:last-child {
			@apply rounded-r border-r-transparent;
		}
	}

	.toggle-item[data-orientation="horizontal"]:dir(rtl) {
		@apply border-x border-l-neutral border-r-transparent;

		&:first-child {
			@apply rounded-r;
		}

		&:last-child {
			@apply rounded-l border-l-transparent;
		}
	}

	.toggle-item[data-orientation="vertical"] {
		@apply border-y border-b-neutral border-t-transparent;

		&:first-child {
			@apply rounded-t;
		}

		&:last-child {
			@apply rounded-b border-b-transparent;
		}
	}

	.toggle-item[data-state="on"] {
		@apply bg-neutral-focus;
	}
</style>
