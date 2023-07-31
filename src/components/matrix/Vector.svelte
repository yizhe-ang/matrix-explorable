<script>
	import themeColors from "daisyui/src/theming/themes";
	import VectorTex from "./VectorTex.svelte";

	export let view;
	export let coords = [0, 0, 0, -1, 2, 0];
	export let color = "white";
	export let texOpacity = 1;

	const vectorProps = {
		end: true,
		width: 3,
		zBias: 10_000,
		// size: 10,
		width: 25
	};

	const data = view.array({
		data: coords,
		width: 2,
		items: 2,
		channels: 3
	});

	const vector = view.vector({
		...vectorProps,
    color
	});

	$: data.set("data", coords);
</script>

<VectorTex {coords} opacity={texOpacity} />
