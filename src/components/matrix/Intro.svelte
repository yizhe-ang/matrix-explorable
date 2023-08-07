<script>
	import {
		matrixVectorFormula,
		matrixVectorEg,
	} from "$data/tex";
	import Tex from "./Tex.svelte";
</script>

<!-- <section class="prose prose-xl translate-x-[calc(-50vw+32.5ch-32.5ch)]"> -->
<section class="prose prose-xl translate-x-[calc(-50vw-50%)] mt-[100vh] max-w-prose h-screen">
<!-- <section class="prose prose-xl"> -->
	<p>What do matrices mean to you?</p>
	<p>
		In school, you may recall reluctantly performing drill after drills of
		matrix-vector multiplications mechanically. You may even have been taught to
		memorize several inane formulas.
	</p>

	<Tex expr={matrixVectorFormula} display />

	<p>Is there a deeper, and visual intuition behind what matrices represent?</p>

	<Tex expr={matrixVectorEg} display />
</section>
