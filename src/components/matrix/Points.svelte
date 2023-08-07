<script>
	import variables from "$data/variables.json";
	import { color as d3Color } from "d3";

	export let view;
	export let t;
	export let dim3 = false;

	const zBias = 100;

	const numPoints = 20;
	const dim = 6;
	const range = [0, 1];

	const pointsVolumeProps = {
		rangeX: range,
		rangeY: range,
		rangeZ: range,
		width: numPoints,
		height: numPoints,
		depth: numPoints / 4,
		items: 1,
		channels: 4,
		live: false,
		expr: (emit, x, y, z) => {
			if (dim3) {
				emit(x, y, z, 1);
			} else {
				emit(x, y, 1, 1);
			}
		}
	};

	let position;
	if (!dim3) {
		pointsVolumeProps.depth = 1;
		position = [-dim / 2, -dim / 2, -dim];
	} else {
		position = [-dim / 2, -dim / 2, -dim / 2];
	}

	view.volume(pointsVolumeProps);

	const transition = view.reveal({ stagger: [1, 1, 0, 0] });

	const points = transition
		.transform({
			scale: [dim, dim, dim],
			position
		})
		.point({
			// Multiply every color component in [0..1] by 255
			colors: "<",
			color: 0xffffff,
			size: 4,
			zBias
		});

	$: transition.set({ enter: t });
</script>
