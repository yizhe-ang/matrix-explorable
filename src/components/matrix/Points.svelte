<script>
	import variables from "$data/variables.json";
	import { lerpArray } from "canvas-sketch-util/math";
	import { color as d3Color } from "d3";

	export let view;

	const zBias = 100;

	const numPoints = 20;
	const dim = 2;
	const range = [-dim, dim];

	const xColor = d3Color(variables.color.x);
	const yColor = d3Color(variables.color.y);
	const zColor = d3Color(variables.color.z);

	// TODO: Bilinear interpolation?

	const pointsVolumeProps = {
		rangeX: range,
		rangeY: range,
		rangeZ: range,
		width: numPoints,
		height: numPoints,
		depth: numPoints,
		items: 1,
		channels: 4,
		live: false,
		expr: (emit, x, y, z) => {
			emit(x, y, z, 1);
		}
	};

	pointsVolumeProps.rangeZ = [0, 0];
	pointsVolumeProps.depth = 1;

	const points = view.volume(pointsVolumeProps);

	const colorsVolumeProps = {
		rangeX: [0, 1],
		rangeY: [0, 1],
		rangeZ: [0, 1],
		width: numPoints,
		height: numPoints,
		depth: numPoints,
		items: 1,
		channels: 4,
		live: false,
		expr: (emit, x, y, z) => {
			// const r = x
			// const g = y
			// const b = 0
			const r = 0.5;
			const g = 0.5;
			const b = 0.5;

			emit(r, g, b, 0.5);
		}
	};

	colorsVolumeProps.rangeZ = [0, 0];
	colorsVolumeProps.depth = 1;

	const colors = view.volume(colorsVolumeProps);

	view.point({
		points: "<<",
		colors: "<",
		// Multiply every color component in [0..1] by 255
		color: 0xffffff,
		size: 50,
		zBias
	});

	// const points = view
	// 	.volume({
	//     rangeX: range,
	//     rangeY: range,
	//     rangeZ: [0, 0],
	// 		width: numPoints,
	// 		height: numPoints,
	// 		depth: 1,
	// 		items: 1,
	// 		channels: 4,
	// 		live: false,
	// 		expr: (emit, x, y, z) => {
	// 			emit(x, y, z, 1);
	// 		}
	// 	})

	// const colors = view
	// 	.volume({
	//     rangeX: [0, 1],
	//     rangeY: [0, 1],
	//     rangeZ: [0, 1],
	// 		width: numPoints,
	// 		height: numPoints,
	// 		depth: 1,
	// 		items: 1,
	// 		channels: 4,
	// 		live: false,
	// 		expr: (emit, x, y, z) => {
	//       // const r = x
	//       // const g = y
	//       // const b = 0
	//       const r = 0.5
	//       const g = 0.5
	//       const b = 0.5

	// 			emit(r, g, b, 1);
	// 		}
	// 	})

	// view
	// 	.point({
	//     points: "<<",
	// 		colors: "<",
	//     // Multiply every color component in [0..1] by 255
	//     color: 0xffffff,
	// 		size: 3,
	//     zBias
	// 	});
</script>
