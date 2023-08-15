<script>
	import { colorB3, colorB1, colorB2 } from "$data/variables";

	export let view;
	export let t;
	export let dim = 10;
	export let position = [0, 0, 0];
  export let rotation = [0, 0, 0]

	const range = [0, 1];

	const props = {
		expr: function (emit, x, y, z, i, j, k, t) {
			emit(x, y);
		},
		width: dim + 1,
		height: dim + 1,
		channels: 2,
		rangeX: range,
		rangeY: range,
	};

	view.area({
		...props
	});

	const transition = view.reveal({ stagger: [1, 1, 0, 0] });

	transition
		.transform({
			position,
			scale: [dim, dim, dim],
      rotation,
		})
		.surface({
			fill: true,
			width: 2,
			color: colorB3,
			// color: "black",
			opacity: 0.95,
			// opacity: 0,
      closed: true,
      // shaded: true,
      width: 1,
      zBias: -5,
		});

	$: transition.set({ enter: t });
</script>
