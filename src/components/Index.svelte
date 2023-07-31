<script>
	import { getContext } from "svelte";
	import Footer from "$components/Footer.svelte";
	import Threlte from "$components/matrix/Threlte.svelte";
	import MatrixInput from "$components/matrix/MatrixInput.svelte";
	import ScrubberInput from "$components/matrix/ScrubberInput.svelte";
	import Article from "./matrix/Article.svelte";
	import Intro from "./matrix/Intro.svelte";
	import Title from "./matrix/Title.svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");

	let canvasWidth;
</script>

<!-- <Demo /> -->
<!-- <Footer /> -->

<!-- <Title /> -->

<!-- TODO: Update width? -->
<!-- <article class="relative flex bg-base-300 w-[calc(100%+65ch)]"> -->
<article class="bg-base-300">
<!-- <article class="flex bg-base-300"> -->
	<!-- FIXME: Why does canvas not resize? -->
	<!-- <div
		id="canvas-wrapper"
		class="sticky top-0 flex-1 min-w-0 h-screen bg-base-300 pointer-events-none translate-x-[calc(50vw-50%)]"
	> -->
	<!-- <div
		id="canvas-wrapper"
		class="sticky top-0 flex-1 min-w-0 h-screen bg-base-300 pointer-events-none"
	> -->
		<!-- <div class="fixed inset-0 bg-base-300"> -->
		<!-- <Threlte /> -->
		<!-- <div
			class="absolute top-0 bg-gradient-to-l from-base-300 to-20% h-full w-full pointer-events-none"
		/>
		<div
			class="absolute top-0 bg-gradient-to-r from-base-300 to-20% h-full w-full pointer-events-none"
		/> -->
	<!-- </div> -->

	<Article />
</article>

<div class="fixed left-0 top-0 flex flex-col items-center px-8 py-8 gap-4 hidden">
	<ScrubberInput />
	<MatrixInput />
</div>

<!-- ScrollTrigger progress bar -->
<div
	id="st-progress"
	class="fixed right-0 top-0 bottom-0 w-2 bg-neutral scale-y-0 rounded-full"
/>

<Footer />
