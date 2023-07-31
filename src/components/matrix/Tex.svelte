<script>
	import katex from "katex";
	import { onMount } from "svelte";
	import { gsap } from "$utils/gsap.js";
	import { createToggle } from "@melt-ui/svelte";

	export let expr;
	export let display = false;
	export let color = false;

	let texEl;
	let q;
	let t;

	let classes = "group relative";
	classes = display ? `${classes} py-1 block my-5` : classes;

	onMount(() => {
		if (color) {
			q = gsap.utils.selector(texEl);

			// TODO: Like turning on the arcade lights
			// to reveal bright, saturated colors

			// TODO: Highlight all tex instances?

			// FIXME: Too inefficient?
			t = gsap.from(q("*"), {
				// FIXME: To change color
				color: "white",
				paused: true,
				duration: 0.3
			});
		}
	});

	// Toggle
	const { toggle, pressed } = createToggle();

	$: if (t && color) {
		onPressed($pressed);
	}
	function onPressed(pressed) {
		if (pressed) {
			t.progress(1);
		}
	}
</script>

{#if color}
	<button
		melt={$toggle}
		class={`${classes} w-full`}
		aria-label="Toggle equation colors"
		on:mouseover={() => {
			if (color) t.play();
		}}
		on:mouseout={() => {
			if (color && !$pressed) t.reverse();
		}}
	>
		<!-- Tex -->
		<span bind:this={texEl}>
			{#if color}
				<!-- Indicator -->
				<div
					class="h-5 w-5 rounded-full bg-neutral-focus text-base-100 shadow-lg group-hover:bg-neutral group-data-[disabled]:cursor-not-allowed group-data-[state=on]:bg-neutral-content
  group-data-[state=on]:text-base-100 transition absolute top-1/2 -translate-y-1/2"
				/>
			{/if}
			{@html katex.renderToString(expr, { displayMode: display })}
		</span>
	</button>
{:else}
	<span class={classes}>
		<!-- Tex -->
		<span bind:this={texEl}>
			{@html katex.renderToString(expr, { displayMode: display })}
		</span>
	</span>
{/if}
