<script>
	import Alert from "./Alert.svelte";
	import Tex from "./Tex.svelte";
	import {
		vectorAsLinearComb,
		matrixVectorFormulaEg,
		matrixVectorFormula3dEg
	} from "$data/tex";
	import Term from "./Term.svelte";
	import { Color } from "three";
	import ColorText from "./ColorText.svelte";
	import Insight from "./Insight.svelte";
	import Intro from "./Intro.svelte";
	import Title from "./Title.svelte";
	import P from "./P.svelte";
	import Spacer from "./Spacer.svelte";
	import Action from "./Action.svelte";
	import Section from "./Section.svelte";
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

	<!-- <section id="section-1" class="prose prose-xl [&>*]:px-10 [&>*]:rounded-xl"> -->
	<Section id="section-1">
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

		<!-- TODO: Animate the text decoration, syncing it with the rest of the animations -->
		<!-- TODO: On hover, highlights all the matching elements -->
		<P id="st-2">
			In the <Tex expr={"xy"} />-coordinate plane, any vector can be thought of
			as the sum of two scaled vectors: the unit vector in the
			<nobr><ColorText color="p"><Tex expr="x" />-direction</ColorText></nobr>,
			and the unit vector in the <ColorText color="s"
				><Tex expr="y" />-direction</ColorText
			>.
		</P>

		<!-- <P id="st-3">
			<Tex expr={vectorAsLinearComb} display color />
      The unit-vector in the x-direction is scaled by the x-coordinate of the vector, and the unit-vector in the y-direction is scaled by the y-coordinate of the vector.
    </P> -->

		<!-- <Tex
      expr={vectorAsLinearCombAlt}
      display
    /> -->

		<P id="st-3">
			<Tex expr={vectorAsLinearComb} display color />
			These are also known as our <Term>standard basis vectors</Term>. The
			vector's coordinates encode the amount to scale each individual basis
			vector, before adding them up.
		</P>

		<p>
			This scaling and addition of vectors is called a <Term
				>linear combination</Term
			>; every vector can be expressed as a linear combination of basis vectors.
		</p>

		<Spacer />

		<Tex expr={matrixVectorFormulaEg} display color />

		<p>
			Did you notice anything similar with the formula for matrix-vector
			multiplication? A vector multiplied with a matrix can also be expressed as
			a linear combination; this time with the columns of the matrix.
		</p>

		<P id="st-4">
			In other words, a matrix can be viewed as a way of packaging information
			about our new basis vectors. This is the core insight: a matrix transforms
			a vector by transforming the original basis vectors; creating an entirely
			new coordinate system.
		</P>

		<P id="st-5">
			Again, the transformed vector is a linear combination of the new basis
			vectors, which are scaled by the coordinates of the original vector.
		</P>

		<Spacer />

		<p>
			In that vein, a matrix transformation appears to warp and transform space
			itself. In order to get a more visceral feel of this, let's visualize what
			happens to sample of vectors in space, each multiplied by the same matrix.
		</p>

		<P id="st-6">
			In order to make the space less visually cluttered, we can represent each
			vector as a point in space instead.
		</P>

		<P id="st-7">
			We'll transform the grid lines too, overlaying it on top of the original.
			The transformation appears to rotate and stretch the space, accordingly
			with where the new basis vectors land.
		</P>

		<P>
			As we'll see with a plethora of examples to come, a matrix performs a
			particular kind of transformation, called a <Term
				>linear transformation</Term
			>. For such transformations:
		</P>

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

		<Spacer />

		<P id="st-8">
			With this understanding, try to tinker about and figure out what kinds of
			transformations are possible with matrices! What basis vectors should you
			choose in order to scale space? How about a reflection, rotation or a
			shear?
		</P>
		<Action>
			<!-- TODO: Allow users to grab the basis vectors too? -->
			<ul>
				<li>Toggle the numbers in the matrix...</li>
				<li>Drag the scrubber...</li>
				<li>Pan and zoom in / out the canvas</li>
			</ul>
		</Action>
	</Section>

	<!-- TODO: How about 3D? -->
	<Section id="section-2">
		<h2 id="test">Transformations in Higher Dimensions</h2>

		<p>
			So far we've only been talking about matrix transformations in
			two-dimensions on the <Tex expr="xy" />-plane. Do the same intuitions
			carry over to higher dimensions?
		</p>

		<P id="st-9">
			To make up three dimensions, we have yet another standard basis vector —
			the unit vector in the <ColorText color="a"
				><Tex expr="z" />-direction</ColorText
			>. This also means we're now fiddling around with vectors of length <Tex
				expr="3"
			/>, representing the coordinates <Tex expr="xyz" />, and matrices of size
			<nobr><Tex expr="3\times3" /></nobr>.
		</P>

		<P id="st-10">
			The concept of matrix transformations in 3D is exactly the same. The three
			basis vectors are transformed to their new locations, warping space along
			with them. These locations are completely determined by the columns of the
			matrix.
		</P>

		<Tex expr={matrixVectorFormula3dEg} display color />

		<p>
			Originally, any vector is composed of a linear combination of these three
			standard basis vectors. To figure out the where the vector lands after the
			transformation, it is a linear combination of the transformed basis
			vectors, each scaled by the respective coordinates in the starting vector.
		</p>

		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni porro quia
			adipisci eaque commodi placeat totam, nihil officia, debitis quo
			necessitatibus quos, exercitationem iusto consectetur optio numquam
			possimus provident laborum!
		</p>
		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni porro quia
			adipisci eaque commodi placeat totam, nihil officia, debitis quo
			necessitatibus quos, exercitationem iusto consectetur optio numquam
			possimus provident laborum!
		</p>
		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni porro quia
			adipisci eaque commodi placeat totam, nihil officia, debitis quo
			necessitatibus quos, exercitationem iusto consectetur optio numquam
			possimus provident laborum!
		</p>
	</Section>

	<!-- TODO: Composition of matrices -->
</div>
