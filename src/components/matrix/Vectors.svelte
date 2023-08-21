<script>
	export let view;
	export let enter;
	export let exit;

  const zBias = 200

	const numPoints = 20;
	const range = [0, 1];
	const dim = 6;

	const opacity = 0.5;

	// Color data
	view.area({
		rangeX: range,
		rangeY: range,
		width: numPoints,
		height: numPoints,
		items: 1,
		channels: 4,
		live: false,
		expr: (emit, x, y) => {
      emit(x, y, 1, opacity)
		}
	});

	// Vector data
	view.area({
		rangeX: range,
		rangeY: range,
		width: numPoints,
		height: numPoints,
		items: 2,
		channels: 2,
		live: false,
		expr: (emit, x, y) => {
			emit(x, y);
			emit(0.5, 0.5);
		}
	});

	const transition = view.reveal({ stagger: [1.5, 1.5, 0, 0] });

	transition
		.transform({
			scale: [dim, dim, dim],
			position: [-dim / 2, -dim / 2, 0]
		})
		.vector({
			width: 1,
      start: true,
      colors: "<<",
      color: 0xffffff,
      zBias,
		});

	$: transition.set({ enter });
	$: transition.set({ exit });
</script>
