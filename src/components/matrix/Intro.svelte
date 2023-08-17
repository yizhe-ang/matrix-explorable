<script>
	import { matrixVectorFormula, matrixVectorEg } from "$data/tex";
	import { onMount } from "svelte";
	import B from "./B.svelte";
	import Spacer from "./Spacer.svelte";
	import Tex from "./Tex.svelte";
	import { gsap } from "$utils/gsap.js";
	import { sceneMounted, introMounted } from "$stores";

	// let mounted;

	// $: if (mounted && sceneMounted) animate();

	// onMount(() => {
	// 	mounted = true;
	// });

	// function animate() {
	// 	gsap
	// 		.timeline({
	// 			scrollTrigger: {
	// 				trigger: "#tex-1",
	// 				start: "top 60%"
	// 			}
	// 		})
	// 		.from("#tex-1 span", {
	// 			opacity: 0,
	// 			stagger: {
	// 				amount: 0.5
	// 			}
	// 		});

	// 	gsap
	// 		.timeline({
	// 			scrollTrigger: {
	// 				trigger: "#tex-2",
	// 				start: "top 60%"
	// 			}
	// 		})
	// 		.from("#tex-2 span", {
	// 			opacity: 0,
	// 			stagger: {
	// 				amount: 0.5
	// 			}
	// 		});

	// 	$introMounted = true;
	// }
</script>

<!-- <section class="prose prose-xl translate-x-[calc(-50vw+32.5ch-32.5ch)]"> -->
<section
	class="prose prose-xl translate-x-[calc(-50vw-50%)] mt-[100vh] max-w-prose"
>
	<!-- <section class="prose prose-xl"> -->
	<p>What do <B>matrices</B> mean to you?</p>

	<Spacer />

	<p>
		Why do we need a way to represent an array of rows and columns of numbers,
		and to execute computations and operations between them?
	</p>

	<!-- TODO: Animate in these math expressions -->
	<div id="tex-1">
		<Tex expr={matrixVectorEg} display />
	</div>

	<p>
		In school, you may recall reluctantly performing drill after drills of
		matrix-vector multiplications mechanically. You may even have been taught to
		memorize several inane formulas.
	</p>

	<div id="tex-2">
		<Tex expr={matrixVectorFormula} display />
	</div>

	<Spacer />

	<!-- <p>Is there a deeper, and visual intuition behind what matrices represent?</p> -->
	<p>
		Let's explore a deeper, and a more <B>visual</B> intuition behind what matrices
		represent.
	</p>
	<!-- TODO: Cute, arcade like emoticon here -->
</section>
