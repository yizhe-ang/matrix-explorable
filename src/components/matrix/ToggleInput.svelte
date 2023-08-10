<script>
	// TODO: Arcade controls aesthetic here?
	// Look at Josh for inspiration
	// TODO: Toggle overlay grids
	// TODO: Have tooltips

  // TODO: Example vector

  // TODO: Change to 2D view

  // TODO: Cube

  // TODO: Reset camera

	import {
		gridToggled,
		transformedGridToggled,
		dataToggled,
		show3d
	} from "$stores";
	import { createToolbar, createToggle, melt } from "@melt-ui/svelte";
	import { Grid, ScatterChart, Layers, Move3d } from "lucide-svelte";

	const size = 30;

	const {
		elements: { root, button, link, separator },
		builders: { createToolbarGroup }
	} = createToolbar();

	const {
		elements: { group: dataGroup, item: dataItem }
	} = createToolbarGroup({ value: dataToggled });

	const {
		elements: { root: threeDToggle }
	} = createToggle({ pressed: show3d });

	const {
		elements: { root: transformedGridToggle }
	} = createToggle({ pressed: transformedGridToggled });

	const {
		elements: { root: gridToggle }
	} = createToggle({ pressed: gridToggled });
</script>

<div
	use:melt={$root}
	class="flex min-w-max items-center gap-4 rounded-md bg-base-200 px-3 py-3 shadow-sm"
>
  <!-- Toggle 3d mode -->
	<button class="item" aria-label="Toggle 3d view" use:melt={$threeDToggle}>
		<Move3d {size} />
	</button>
	<div class="separator" use:melt={$separator} />

	<!-- Toggle grid -->
	<button class="item" aria-label="Toggle grid" use:melt={$gridToggle}>
		<Grid {size} />
	</button>
	<!-- Toggle transformed grid -->
	<button
		class="item"
		aria-label="Toggle transformed grid"
		use:melt={$transformedGridToggle}
	>
		<Grid class="-skew-x-12" {size} />
	</button>
	<div class="separator" use:melt={$separator} />

	<!-- Data toggles -->
	<div class="flex items-cener gap-1" use:melt={$dataGroup}>
		<button class="item" use:melt={$dataItem("points")}>
			<ScatterChart {size} />
		</button>
		{#if $show3d}
			<button class="item" use:melt={$dataItem("3d points")}>
				<ScatterChart {size} />
			</button>
		{/if}
		<button class="item" use:melt={$dataItem("planes")}>
			<Layers {size} />
		</button>
		{#if $show3d}
			<button class="item" use:melt={$dataItem("3d planes")}>
				<Layers {size} />
			</button>
		{/if}
	</div>
</div>

<style lang="postcss">
	.item {
		@apply rounded-md p-2 transition-all;

		&:hover {
			@apply bg-base-100;
		}

		&[data-state="on"] {
			@apply bg-neutral;
		}

		&:focus {
			@apply ring-2 ring-info;
		}
	}

	.separator {
		@apply w-[2px] self-stretch bg-neutral;
	}
</style>
