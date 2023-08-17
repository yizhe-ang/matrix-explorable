<script>
	import Tex from "./Tex.svelte";
	import {
		matrixVectorFormula,
		matrixVectorFormulaColored,
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
	import B from "./B.svelte";
	import { Grab } from "lucide-svelte";
	import ActionIcon from "./ActionIcon.svelte";
	import InteractionsList from "./InteractionsList.svelte";
</script>

<div
	id="article"
	class="relative max-w-prose bg-gradient-to-l from-base-100 via-base-300 via-90% py-12"
>

	<div id="title-spacer" class="h-[2500px]" />

	<Intro />

	<div class="h-[500px]" />

	<!-- <section id="section-1" class="prose prose-xl [&>*]:px-10 [&>*]:rounded-xl"> -->
	<Section id="section-1">
		<!-- <section class="prose prose-xl max-w-[50ch]"> -->
		<!-- <h2>Matrix as Linear Transformations</h2> -->

		<p>
			A vector multiplied by a matrix returns yet another vector — it <B
				>transforms</B
			> a vector into a new vector. Let's visualize this transformation with an example.
		</p>

		<!-- <h3>Vectors as a Linear Combination of Basis Vectors</h3> -->

		<Spacer />

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

		<!-- TODO: Do text highlighting that syncs with the corresponding animation -->
		<P id="st-3">
			<Tex expr={vectorAsLinearComb} display color />
			These are also known as our <Term>standard basis vectors</Term>. The
			vector's coordinates encode the amount to scale each individual basis
			vector, before adding them up.
		</P>

		<p>
			This scaling and addition of vectors is called a <Term
				>linear combination</Term
			>, and every vector can be expressed as a linear combination of basis
			vectors.
		</p>

		<Spacer />

		<Tex expr={matrixVectorFormulaColored} display />

		<p>
			Did you notice anything similar with the expression for matrix-vector
			multiplication? A vector multiplied with a matrix can also be expressed as
			a linear combination; only this time the standard basis vectors are
			replaced by the columns of the matrix.
		</p>

		<Tex expr={matrixVectorFormulaEg} display color />

		<P id="st-4">
			In other words, a matrix can be viewed as a way of packaging information
			about our the new basis vectors that we want. This is the core insight: a
			matrix transforms a vector by <B
				>transforming the original basis vectors</B
			>; creating an entirely new coordinate system.
		</P>

		<P id="st-5">
			Again, the transformed vector is a linear combination of the new basis
			vectors, which are scaled by the coordinates of the original vector.
		</P>

		<Spacer />

		<p>
			In that vein, a matrix transformation appears to warp and transform space.
			To get a visceral feel of this, let's visualize what happens to not just a
			single vector, but <B>a sample of vectors in space</B>, each multiplied by
			the same matrix.
		</p>

		<P id="st-6">
			In order to make the space less visually cluttered, we can represent each
			vector as a point in space instead. We'll transform the grid lines along
			too, overlaying on top a copy of the original.
		</P>

		<P id="st-7">
			The transformation appears to rotate and stretch the space, accordingly
			with where the new basis vectors land.
		</P>

		<P>
			As we'll see when you have a chance to tinker around with different basis
			vectors, a matrix performs a particular kind of transformation, called a <Term
				>linear transformation</Term
			>. Visually, you'll notice that:
		</P>

		<ul class="ml-4 marker:text-info marker:text-2xl">
			<li>
				All lines in the original space remain as lines, without getting curved,
				and
			</li>
			<li>Origin remains fixed in place.</li>
		</ul>

		<p>
			As an example, all grid lines stay parallel and evenly spaced after the
			transformation.
		</p>

		<Spacer />

		<!-- TODO: Have a kind of recap at the end -->
		<div>
			<Tex expr={matrixVectorFormulaColored} display />
			<Insight>
				<ul>
					<li>
						Any vector can be expressed as the addition of scaled basis vectors,
						i.e.
						<B>a linear combination of basis vectors</B>.
					</li>
					<li>
						A matrix can be viewed as a way to <B
							>package information about a linear transformation</B
						>. The columns of a matrix represent where the new basis vectors
						land after the transformation.
					</li>
					<li>
						Matrix-vector multiplication is a way to compute where a given
						vector lands after the transformation defined by a matrix.
					</li>
				</ul>
			</Insight>
		</div>

		<Spacer />

		<div class="">
			<P id="st-8">
				With our understanding so far, try to tinker about and figure out what
				kinds of transformations are possible with matrices!
			</P>
			<p>
				What basis vectors should you choose in order to scale space uniformly
				in all directions? How about a reflection, rotation or a shear?
			</p>
			<Action>
				<!-- TODO: Allow users to grab the basis vectors too? -->
				<ul class="list-none">
					<InteractionsList />
				</ul>
			</Action>
		</div>
	</Section>

	<!-- TODO: How about 3D? -->
	<Section id="section-2">
		<h2 class="text-neutral">Beyond Two-Dimensions</h2>

		<p>
			So far we've only been talking about matrix transformations in
			two-dimensions on the <Tex expr="xy" />-plane. Do the same intuitions
			carry over to <B>higher dimensions</B>?
		</p>

		<P id="st-9">
			To make up three dimensions, we have yet another standard basis vector —
			the unit vector in the <ColorText color="a"
				><Tex expr="z" />-direction</ColorText
			>. This also means we're now fiddling around with vectors of length <Tex
				expr="3"
			/> — representing the <Tex expr="xyz" /> coordinates — and matrices of size
			<nobr><Tex expr="3\times3" /></nobr>.
		</P>

		<P id="st-10">
			The concept of matrix transformations in 3D is exactly the same. The three
			basis vectors are transformed to their new locations, warping space along
			with them. These locations are completely determined by the columns of the
			matrix.
		</P>

		<Tex expr={matrixVectorFormula3dEg} display color />

		<P id="st-11">
			Originally, any vector is composed of a linear combination of these three
			standard basis vectors. To figure out the where the vector lands after the
			transformation, it is a linear combination of the transformed basis
			vectors, each scaled by the respective coordinates in the starting vector.
		</P>

		<P id="st-12">
			From the visual examples we've seen thus far, the most obvious application
			of matrix transformations would be that of computer graphics. In fact,
			this is precisely how this article was built! Matrices provide a language
			to rotate, scale and translate vectors and points and consequently entire
			objects in 2D or 3D space.
		</P>

		<!-- <p>
			Talk about application in computer graphics... give a concrete example
			visually. Give other examples of applications of matrices... From the
			visual examples we've seen thus far, the most obvious application of
			matrix transformations would be that of computer. In fact,
		</p> -->
		<Spacer />
		<p id="st-13">
			Go forth and wrap your head around matrix transformations in 3D! Now you
			have a whole additional dimension to fidget around with.
		</p>
		<div>
			<Action>
				<ul class="list-none">
					<InteractionsList />
					<li>
						<ActionIcon icon={Grab} /> Right click and drag to rotate around the
						space
					</li>
				</ul>
			</Action>
		</div>
	</Section>

	<!-- TODO: Composition of matrices -->
</div>
