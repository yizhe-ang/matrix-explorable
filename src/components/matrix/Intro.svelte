<script>
	import { matrixVectorFormula, matrixVectorEg } from "$data/tex";
	import B from "./B.svelte";
	import Spacer from "./Spacer.svelte";
	import Tex from "./Tex.svelte";
</script>

<!-- <section class="prose prose-xl translate-x-[calc(-50vw+32.5ch-32.5ch)]"> -->
<section
	class="prose prose-xl translate-x-[calc(-50vw-50%)] mt-[100vh] max-w-prose h-screen"
>
	<!-- <section class="prose prose-xl"> -->
	<p>What do <B>matrices</B> mean to you?</p>

	<p>
		Why do we need a way to represent an array of rows and columns of numbers,
		and to execute computations and operations between them?
	</p>

  <!-- TODO: Animate in these math expressions -->
	<Tex expr={matrixVectorEg} display />

	<p>
		In school, you may recall reluctantly performing drill after drills of
		matrix-vector multiplications mechanically. You may even have been taught to
		memorize several inane formulas.
	</p>

	<Tex expr={matrixVectorFormula} display />

  <Spacer />

	<!-- <p>Is there a deeper, and visual intuition behind what matrices represent?</p> -->
	<p>
		Let's explore a deeper, and a more <B>visual</B> intuition behind what matrices
		represent.
	</p>
  <!-- TODO: Cute, arcade like emoticon here -->
</section>
