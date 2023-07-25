<script>
  // TODO: Just import a normal sphere from three.js?
	import * as MathBox from "mathbox";

	export let view;

  const scale = 2
  const zBias = 1

	const sphere = view
		.matrix({
			bufferWidth: 128,
			bufferHeight: 64,
			width: 64,
			height: 32,
			live: false,
			expr: (emit, i, j, time) => {
				let φ = (i / 64) * MathBox.τ;
				let θ = (j / 31 - 0.5) * MathBox.π;

				emit(Math.cos(φ) * Math.cos(θ), Math.sin(θ), Math.sin(φ) * Math.cos(θ));
			},
			channels: 3
		})
		.transform({
			scale: [scale, scale, scale]
		})
		.surface({
			points: "<",
			normals: "<",
			color: "#d6d3d1",
			shaded: true,
			closedX: true,
      zBias,
      lineX: true,
      lineY: true,
      width: 0.2,
      opacity: 0.5,
		});
</script>
