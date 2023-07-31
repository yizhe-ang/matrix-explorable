<script>
	import Alert from "./Alert.svelte";
	import Tex from "./Tex.svelte";
	import {
		matrixVectorFormula,
		matrixVectorEg,
		vectorAsLinearComb,
		vectorAsLinearCombAlt,
		matrixVectorFormulaEg
	} from "$data/tex";
	import Term from "./Term.svelte";
	import { Color } from "three";
	import ColorText from "./ColorText.svelte";
	import Insight from "./Insight.svelte";
	import Intro from "./Intro.svelte";
	import Title from "./Title.svelte";
	import P from "./P.svelte";
</script>

<!-- FIXME: max-w-prose -->
<div
	id="article"
	class="relative max-w-prose bg-gradient-to-l from-base-100 via-base-300 via-90% py-12"
>
	<!-- <div
	id="article"
	class="relative bg-gradient-to-l from-base-100 from-20% px-10 py-12"
> -->
	<!-- <Title /> -->

	<Intro />

	<section id="section-1" class="prose prose-xl [&>*]:px-10 [&>*]:rounded-xl">
		<!-- <section class="prose prose-xl max-w-[50ch]"> -->
		<h2>Matrix as Linear Transformations</h2>

		<p>
			A vector multiplied by a matrix returns a new vector. It transforms a
			vector into a new vector. Let's visualize this transformation with an
			example.
		</p>

		<h3>Vectors as a Linear Combination of Basis Vectors</h3>

		<P id="st-1">
			Let's first think about what the coordinates of a <ColorText color="in"
				>vector</ColorText
			> represent.
		</P>

		<Tex expr={vectorAsLinearComb} display color />

		<!-- TODO: Animate the text decoration, syncing it with the rest of the animations -->
		<!-- TODO: On hover, highlights all the matching elements -->
		<P id="st-2">
			In the <Tex expr={"xy"} />-coordinate plane, any vector can be thought of
			as the sum of two scaled vectors: the unit vector in the <ColorText
				color="p"><Tex expr="x" />-direction</ColorText
			>, and the unit vector in the <ColorText color="s"
				><Tex expr="y" />-direction</ColorText
			>.
		</P>

		<!-- <Tex
      expr={vectorAsLinearCombAlt}
      display
    /> -->

		<p>
			These are also known as our <Term>basis vectors</Term>. Hence, the
			vector's coordinates encode the amount to scale each individual basis
			vector.
		</p>

		<p>
			This scaling of vectors and then adding them up is called a <Term
				>linear combination</Term
			>.
		</p>

		<p>
			Every vector can be expressed as a linear combination of basis vectors.
		</p>

		<Tex expr={matrixVectorFormulaEg} display color />

		<p>
			Do you notice anything similar with the formula for matrix-vector
			multiplication? A vector multiplied with a matrix can also be expressed as
			a linear combination; this time with the columns of the matrix.
		</p>

		<p>
			In other words, a matrix can be viewed as a way of packaging information
			about our new basis vectors. This is the core insight: a matrix transforms
			a vector by transforming the original basis vectors; creating an entirely
			new coordinate system.
		</p>

		<p>
			In that vein, a matrix transformation appears to warp and transform space
			itself. In order to get a more visceral feel of this, let's visualize what
			happens to sample of points in space, each multiplied by the same matrix.
		</p>

		<p>
			A matrix performs a particular kind of transformation, called a <Term
				>linear transformation</Term
			>. For such transformations:
		</p>

		<ul>
			<li>
				All lines in the original space remain as lines, without getting curved.
			</li>
			<li>Origin remains fixed in place.</li>
		</ul>

		<p>
			A visual example is that all grid lines stay parallel and evenly spaced.
		</p>

		<!-- TODO: Have a kind of recap at the end -->
		<Insight>
			<p>These are the core ideas of matrix transformations:</p>
			<ul>
				<li>
					All lines in the original space remain as lines, without getting
					curved.
				</li>
				<li>Origin remains fixed in place.</li>
			</ul>
		</Insight>

		<p>
			With this understanding, try to tinker about and figure out what kinds of
			transformations are possible with matrices! What basis vectors should you
			choose in order to scale space? How about a reflection, rotation or a
			shear?
		</p>
	</section>

	<!-- TODO: How about 3D? -->

	<!-- TODO: Composition of matrices -->
</div>

<style lang="postcss">
	section :global(.active) {
		/* @apply bg-gradient-to-l from-neutral via-base-100 via-5%; */
		/* @apply bg-gradient-to-l from-neutral to-10%; */
		/* @apply bg-gradient-to-l from-neutral; */
		@apply bg-base-100;
		/* @apply border-r-[20px] border-neutral; */
	}
</style>
