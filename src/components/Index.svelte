<script>
	import Threlte from "$components/matrix/Threlte.svelte";
	import MatrixInput from "$components/matrix/MatrixInput.svelte";
	import ScrubberInput from "$components/matrix/ScrubberInput.svelte";
	import Article from "./matrix/Article.svelte";
	import Title from "./matrix/Title.svelte";
	import ToggleInput from "./matrix/ToggleInput.svelte";
	import { debug, showPlayground } from "$stores";
	import TogglePlayground from "./matrix/TogglePlayground.svelte";
	import { loaded } from "$stores";
	import { gsap, ScrollTrigger } from "$utils/gsap.js";
	import Footer from "./matrix/Footer.svelte";
	import mq from "$stores/mq.js";

	$: if ($mq.lg && $loaded) {
		gsap.from("canvas", {
			opacity: 0,
			duration: 2
		});

		gsap.set("body", {
			overflowY: "visible",
			overflowX: "hidden"
		});

		ScrollTrigger.refresh();
	}
</script>

{#if !$debug}
	<Title />
{/if}

<!-- TODO: Some fancy gradient? -->
<!-- <div id="loading-overlay" class="fixed inset-0 bg-base-300" /> -->

<!-- TODO: Update width? -->
<!-- {#if $mq.lg} -->
<article class="relative bg-base-300 w-[calc(100%+65ch)] hidden lg:flex">
	<div
		id="canvas-wrapper"
		class="sticky top-0 flex-1 min-w-0 h-screen bg-base-300 {!$debug
			? `pointer-events-none`
			: ``}"
	>
		<Threlte />
	</div>

	<Article />
</article>
<!-- {/if} -->

{#if $showPlayground}
	<TogglePlayground />
{/if}

<div
	id="inputs"
	class="fixed left-0 top-0 flex flex-col items-start px-8 py-8 gap-7 pointer-events-none {!$debug
		? `invisible`
		: ``}"
>
	<ToggleInput />
	<ScrubberInput />
	<div>
		<MatrixInput />
	</div>
</div>

<!-- ScrollTrigger progress bar -->
<!-- TODO: Shift to place near the canvas instead? -->
<div
	id="st-progress"
	class="fixed left-0 top-0 bottom-0 w-2 bg-neutral scale-y-0 rounded-full"
/>

<Footer />
