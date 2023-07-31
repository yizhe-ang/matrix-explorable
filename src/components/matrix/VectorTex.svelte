<script>
	import { HTML } from "@threlte/extras";
	import katex from "katex";

	export let coords;
	export let opacity;

	$: [x1, y1, z1, x2, y2, z2] = coords;

	$: angle = Math.atan2(y2, x2);

	const offset = 0.4;
	$: dx = offset * Math.cos(angle);
	$: dy = offset * Math.sin(angle);

	$: tex = katex.renderToString(String.raw`\left[\begin{array}{r}
  ${formatCoord(x2)} \\
  ${formatCoord(y2)}
  \end{array}\right]`);

	function formatCoord(coord) {
		return coord.toFixed(1).replace(/[.,]0$/, "");
	}
</script>

<HTML position={[x2 + dx, y2 + dy]} center>
	<span
    class="text-2xl"
    style:opacity
  >
		<!-- <span class="text-2xl opacity-50"> -->
		{@html tex}
	</span>
</HTML>
