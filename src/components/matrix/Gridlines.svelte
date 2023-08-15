<script>
	import { colorNf, colorN, colorGridAlt, colorGrid } from "$data/variables.js";

	// FIXME: Change this to Threlte's Grid?

	export let view;
	export let t;

	const divisions = 10;
	const range = 5;

	const gridProps = {
		width: 0.5,
		// opacity: 0.9,
		color: colorGrid,
		divideX: divisions,
		divideY: divisions,
		rangeX: [-range, range],
		rangeY: [-range, range]
	};

	const outerGridProps = {
		divideX: 2,
		divideY: 2,
		width: 1.5
	};

	const transition = view.reveal({ stagger: [1, 1, 0, 0] });

	transition
		.grid({
			...gridProps,
			axes: [2, 3],
			origin: [-5, 0, 0]
		})
		.grid({
			...gridProps,
			axes: [1, 3],
			origin: [0, 5, 0]
		})
		.grid({
			...gridProps,
			axes: [2, 3],
			origin: [-5, 0, 0],
			...outerGridProps
		})
		.grid({
			...gridProps,
			axes: [1, 3],
			origin: [0, 5, 0],
			...outerGridProps
		});

	$: transition.set({ enter: t });
</script>
