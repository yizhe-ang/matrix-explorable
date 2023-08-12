<script>
	// TODO: Arcade controls aesthetic here?
	// Look at Josh for inspiration
	// TODO: Toggle overlay grids
	// TODO: Have tooltips

	// TODO: Example vector

	// TODO: Change to 2D view

	// TODO: Cube

	// TODO: Reset camera

	// TODO: 3d model
	// TODO: Image

	// TODO: Auto-rotate?

	import {
		gridToggled,
		transformedGridToggled,
		dataToggled,
		show3d,
		resetViewToggle,
		grid3dToggled,
		inputVectorToggled
	} from "$stores";
	import { createToolbar, createToggle, melt } from "@melt-ui/svelte";
	import {
		Grid,
		ScatterChart,
		Layers,
		Move3d,
		Eye,
		Grip,
		Scale3d,
		Square,
		Codesandbox,
		MoveUpRight
	} from "lucide-svelte";

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

	const {
		elements: { root: grid3dToggle }
	} = createToggle({ pressed: grid3dToggled });

	const {
		elements: { root: inputVectorToggle }
	} = createToggle({ pressed: inputVectorToggled });
</script>

<div
	use:melt={$root}
	class="flex min-w-max items-center gap-4 rounded-md bg-base-200 px-3 py-3 shadow-lg shadow-neutral-content/20 pointer-events-auto"
>
	<!-- Reset view -->
	<button
		class="item"
		data-tip="Reset View"
		on:click={() => ($resetViewToggle = !$resetViewToggle)}
	>
		<Eye {size} />
	</button>

	<!-- Toggle 3d mode -->
	<button class="item" data-tip="3d View" use:melt={$threeDToggle}>
		<Move3d {size} />
	</button>

	<div class="separator" use:melt={$separator} />

	<!-- Toggle input vector -->
	<button class="item" data-tip="Show Vector" use:melt={$inputVectorToggle}>
		<MoveUpRight {size} />
	</button>

	<!-- Toggle grid -->
	<button class="item" data-tip="Show Grid" use:melt={$gridToggle}>
		<Grid {size} />
	</button>

	<!-- Toggle transformed grid -->
	<button
		class="item"
		data-tip="Show Transformed Grid"
		use:melt={$transformedGridToggle}
	>
		<Grid class="-skew-x-12" {size} />
	</button>

	<!-- Toggle 3d grid -->
	{#if $show3d}
		<button class="item" data-tip="Show 3D Grid" use:melt={$grid3dToggle}>
			<Codesandbox {size} />
		</button>
	{/if}

	<div class="separator" use:melt={$separator} />

	<!-- Data toggles -->
	<div class="flex items-center gap-1" use:melt={$dataGroup}>
		<button class="item" use:melt={$dataItem("points")} data-tip="Show Points">
			<Grip {size} />
		</button>
		{#if $show3d}
			<button
				class="item"
				use:melt={$dataItem("3d points")}
				data-tip="Show 3D Points"
			>
				<!-- <ScatterChart {size} /> -->
				<Scale3d {size} />
			</button>
		{/if}
		<button class="item" use:melt={$dataItem("planes")} data-tip="Show Plane">
			<Square {size} />
		</button>
		{#if $show3d}
			<button
				class="item"
				use:melt={$dataItem("3d planes")}
				data-tip="Show 3D Planes"
			>
				<Layers {size} />
			</button>
		{/if}
	</div>
</div>

<style lang="postcss">
	.item {
		@apply tooltip tooltip-bottom tooltip-info rounded-md p-2 transition-all;

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
