<script>
  import { colorNf, colorN, colorGridAlt, colorGrid } from "$data/variables.js"

	export let view;
	export let t;

	const divisions = 10;
	const range = 5;

	const gridProps = {
		width: 2,
		opacity: 0.9,
    color: colorGrid,
		divideX: divisions,
		divideY: divisions,
		rangeX: [-range, range],
		rangeY: [-range, range],
		zBias: 10,
		zIndex: 2,
	};

	const transition = view.reveal({ stagger: [1, 1, 0, 0] });

	transition
		.grid({
			...gridProps,
			axes: [2, 3],
			origin: [0 - 5.5, 0]
		})
		.grid({
			...gridProps,
			axes: [1, 3],
			origin: [0, 5.5, 0]
		});

	$: transition.set({ enter: t });
</script>
