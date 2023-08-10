<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Threlte from "$components/matrix/Threlte.svelte";
	import MatrixInput from "$components/matrix/MatrixInput.svelte";
	import ScrubberInput from "$components/matrix/ScrubberInput.svelte";
	import Article from "./matrix/Article.svelte";
	import Intro from "./matrix/Intro.svelte";
	import Title from "./matrix/Title.svelte";
	import ToggleInput from "./matrix/ToggleInput.svelte";
	import { Vector3 } from "three/src/math/Vector3";
	import { debug } from "$stores";

	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

{#if !$debug}
	<Title />
{/if}

<!-- TODO: Update width? -->
<article class="relative flex bg-base-300 w-[calc(100%+65ch)]">
	<!-- FIXME: For some reason no pointer events around the origin -->
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

<div
	id="inputs"
	class="fixed left-0 top-0 flex flex-col items-start px-8 py-8 gap-7 {!$debug
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
