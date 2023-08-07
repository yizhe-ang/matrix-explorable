<script>
	import vertexXyz from "$shaders/vertexXyz.js";
	import fragmentXyz from "$shaders/fragmentXyz.js";

	export let view;
	export let t;
	export let dim3 = false;

	const samples = 9;
	const dim = 6;
	const range = [0, 1];

	const volumeProps = {
		expr: function (emit, x, y, z, i, j, k, t) {
			if (dim3) {
				emit(x, y, z);
			} else {
				emit(x, y, 1);
			}
		},
		width: samples,
		height: samples,
		depth: samples,
		channels: 3,
		rangeX: range,
		rangeY: range,
		rangeZ: range
	};

	let position;
	if (!dim3) {
		volumeProps.depth = 1;
		position = [-dim / 2, -dim / 2, -dim];
	} else {
		position = [-dim / 2, -dim / 2, -dim / 2];
	}

	view.volume({
		...volumeProps
	});

	// Nest vertex/fragment transform
	let xf = view;
	xf = xf
		.shader({
			code: vertexXyz
		})
		.vertex({
			// Work in data XYZ instead of view XYZ
			pass: "data"
		});

	xf = xf
		.shader({
			code: fragmentXyz
		})
		.fragment({
			// Convert from (web) sRGB to (GL) linear RGB on output
			gamma: true
		});

	const transition = xf.reveal({ stagger: [1, 1, 0, 0] });

	// Make surface from data
	transition
		.transform({
			position,
			scale: [dim, dim, dim]
			// rotation: [0, 0, Math.PI / 2]
		})
		.surface({
			fill: true,
			lineX: false,
			lineY: false,
			width: 2,
			zBias: 1,
			color: 0xffffff,
      // opacity: 0.5
		});

	$: transition.set({ enter: t });
</script>
