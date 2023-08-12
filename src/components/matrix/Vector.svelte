<script>
	import VectorTex from "./VectorTex.svelte";
	import { HTML } from "@threlte/extras";
	import katex from "katex";
	import { formatCoord } from "$utils";
	import { Color } from "three";
	import { onMount } from "svelte";

	export let view;
	export let coords = [0, 0, 0, -1, 2, 0];
	export let color = "white";
	export let tex = true;
	export let texOpacity = 1;
	export let scalar = false;
	export let scalarOpacity = 1;
	export let scalarAlign = "center";
	export let visible = true;
	export let dim3 = false;

	$: [x1, y1, z1, x2, y2, z2] = coords;

	const vectorProps = {
		end: true,
		width: 3,
		// zBias: 10_000,
		zBias: 1_000,
    zIndex: 3,
		// size: 10,
		width: 3,
		// color: new Color(color).convertLinearToSRGB(),
		color,
		visible
	};

	const data = view.array({
		data: coords,
		width: 2,
		items: 2,
		channels: 3
	});

	const vector = view.vector({
		...vectorProps
	});

	$: data.set("data", coords);
	$: vector.set("visible", visible);

	// const alignOpts = {
	// 	center: "translate-x-0",
	// 	left: "translate-x-2/3",
	// 	top: "translate-y-2/3"
	// };

	const offset = 0.4;
	let dx;
	let dy;

	$: if (scalarAlign == "center") {
		dx = 0;
		dy = 0;
	} else if (scalarAlign == "left") {
		dx = offset * 1.5;
		dy = 0;
	} else if (scalarAlign == "top") {
		dx = 0;
		dy = -offset;
	} else if (scalarAlign == "right") {
		dx = -offset;
		dy = 0;
	} else if (scalarAlign == "bottom") {
		dx = 0;
		dy = offset;
	}

	let ref;

	onMount(() => {
		// HACK
		if (ref) ref.parentElement.style.pointerEvents = "none";
	});
</script>

{#if tex}
	<VectorTex {coords} opacity={texOpacity} {dim3} />

	<!-- Scalar label -->
	{#if scalar}
		{@const position = dim3
			? [x2 / 2, y2 / 2, z2 / 2]
			: [x2 / 2 + dx, y2 / 2 + dy, z2 / 2]}
		<HTML {position} center>
			<span
				bind:this={ref}
				class="text-xl whitespace-nowrap"
				style:opacity={scalarOpacity}
			>
				{@html katex.renderToString(String.raw`\times ${formatCoord(scalar)}`)}
			</span>
		</HTML>
	{/if}
{/if}
