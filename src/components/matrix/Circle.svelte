<script>
  // TODO: Just use three.js geometry?
	import * as MathBox from "mathbox";

	export let view;

	const zBias = 1;
	const scale = 2;

	const disc = [];
	const n = 64;

	for (let i = 0; i <= n; ++i) {
		let theta = (MathBox.τ * i) / n;
		disc.push([Math.cos(theta), Math.sin(theta), 0]);
	}

	view
		.array({
			data: disc,
			items: n + 1,
			channels: 3
		})
		.transform({
			scale: [scale, scale, scale]
		})
		.face({
			color: "#a8a29e",
			shaded: true,
			zBias,
			line: true,
			lineBias: zBias,
		});
</script>
