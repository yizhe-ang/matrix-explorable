<script>
	import * as MathBox from "mathbox";
	import katex from "katex";
	import { colorX, colorY, colorZ } from "$data/variables.js";
	import VectorTex from "./VectorTex.svelte";

	export let view;
	export let xCoords = [0, 0, 0, 1, 0, 0];
	export let yCoords = [0, 0, 0, 0, 1, 0];
	export let zCoords = [0, 0, 0, 0, 0, 1];

	const vectorProps = {
		end: true,
		width: 3,
		zBias: 10_000,
		// size: 10,
		width: 25
	};

	// TODO: Into a single data matrix?
	// Draw basis vectors

	// x
	const xData = view.array({
		data: xCoords,
		width: 2,
		items: 2,
		channels: 3
	});

	view.vector({
		...vectorProps,
		color: colorX
	});

	// y
	const yData = view.array({
		data: yCoords,
		width: 2,
		items: 2,
		channels: 3
	});

	view.vector({
		...vectorProps,
		color: colorY
	});

	// z
	const zData = view.array({
		data: zCoords,
		width: 2,
		items: 2,
		channels: 3
	});

	view.vector({
		...vectorProps,
		color: colorZ
	});

	// Updates
	$: xData.set("data", xCoords);
	$: yData.set("data", yCoords);
	$: zData.set("data", zCoords);
</script>

<VectorTex position={xCoords.slice(3)} coords={xCoords} opacity={0.5} />
