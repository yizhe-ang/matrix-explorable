<script>
	import { HTML } from "@threlte/extras";
	import katex from "katex";
	import { formatCoord } from "$utils";
	import { onMount } from "svelte";

	export let coords;
	export let opacity;
	export let dim3 = false;

	$: [x1, y1, z1, x2, y2, z2] = coords;

	$: φ = Math.atan2(y2, x2);

	let dx;
	let dy;
	let dz;

	$: if (dim3) {
		const offset = 0.4;

		const r = Math.sqrt(x2 * x2 + y2 * y2 + z2 * z2);
		// const θ = Math.acos(z2 / 1); //
		const θ = Math.acos(z2 / r); // FIXME: Or is offset here just 1?

		dx = offset * Math.sin(θ) * Math.cos(φ);
		dy = offset * Math.sin(θ) * Math.sin(φ);
		dz = offset * Math.cos(θ);
	} else {
		const offset = 0.6;

		dx = offset * Math.cos(φ);
		dy = offset * Math.sin(φ);
		dz = 0;
	}

	$: tex = katex.renderToString(String.raw`\left[\begin{array}{r}
  ${formatCoord(x2)} \\
  ${formatCoord(y2)} \\
  ${dim3 ? `${formatCoord(z2)}` : ``}
  \end{array}\right]`);

	$: position = [x2 + dx, y2 + dy, z2 + dz];

	let ref;

	onMount(() => {
		// HACK
		ref.parentElement.style.pointerEvents = "none";
	});
</script>

<HTML {position} center>
	<span
		bind:this={ref}
		class="{dim3 ? `text-xl`: `text-2xl`} bg-base-300/50 inline-block"
		style:opacity
	>
		<!-- <span class="text-2xl opacity-50"> -->
		{@html tex}
	</span>
</HTML>
