<script>
	import A from "./A.svelte";
	import IconLink from "./IconLink.svelte";
	import { Twitter, Linkedin, Mail, Github } from "lucide-svelte";

	const iconSize = 36;
</script>

<!-- TODO: Mention SOME3 -->

<!-- TODO: Credits, source of the models etc. -->

<footer class="max-w-prose mx-auto p-5 prose prose-xl pt-16 pb-28">
	<section class="flex flex-col items-center gap-8 text-center pb-10">
		<div>
			<p>Like my stuff? :)</p>
			<div class="kofi-button grid place-content-center">
				<a class="kofi-link" href="https://ko-fi.com/U7U4NH69A" target="_blank"
					><img
						class="m-0"
						height="48"
						style="border:0px;height:48px;"
						src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
						border="0"
						alt="Buy Me a Coffee at ko-fi.com"
					/></a
				>
			</div>
		</div>
		<div>
			<p>
				Any questions, comments or suggestions? Feel free to connect with me!
			</p>
			<div class="flex gap-5 justify-center">
				<IconLink href="https://twitter.com/yizhe_ang">
					<Twitter slot="icon" size={iconSize} />
					<svelte:fragment slot="label">Twitter</svelte:fragment>
				</IconLink>
				<IconLink href="https://www.linkedin.com/in/yizhe-ang/">
					<Linkedin slot="icon" size={iconSize} />
					<svelte:fragment slot="label">LinkedIn</svelte:fragment>
				</IconLink>
				<IconLink href="mailto:ang.yizhe@u.nus.edu">
					<Mail slot="icon" size={iconSize} />
					<svelte:fragment slot="label">Email</svelte:fragment>
				</IconLink>
				<IconLink href="https://github.com/yizhe-ang">
					<Github slot="icon" size={iconSize} />
					<svelte:fragment slot="label">Github</svelte:fragment>
				</IconLink>
			</div>
		</div>
		<div class="flex flex-col items-center">
			<p>
				Check out my <A href="https://yizhe-ang.github.io/">portfolio</A> and other
				explorables:
			</p>
			<div>
				<div>
					<a
						href="https://k-means-explorable.vercel.app/"
						target="_blank"
						rel="noopener noreferrer"
						class="flex flex-col gap-5 items-start"
					>
						<img
							src="https://yizhe-ang.github.io/imgs/bg-7.png"
							alt="thumbnail"
							class="w-72 h-40 object-cover rounded-xl m-0 shadow-lg shadow-neutral-content/10"
						/>
						<span class="block text-2xl">K-Means Clustering</span>
					</a>
				</div>
			</div>
		</div>
	</section>

	<div class="divider" />

	<section class="prose-lg">
		<p>
			<A href="https://github.com/yizhe-ang/matrix-explorable">Source code</A> of
			the article.
		</p>

		<p>
			This article was directly inspired by explainer videos of matrices and
			linear transformations by <A href="https://youtu.be/kYB8IZa5AuE"
				>3Blue1Brown</A
			> and <A href="https://youtu.be/7Gtxd-ew4lk">Visual Kernel</A>. This
			article is merely my attempt at making an interactive complement to these
			amazing resources already out there.
		</p>

		<p>
			I'd love to extend this article with more examples of different types of
			linear transformations and their associated matrices, and matrix
			decompositions like spectral decomposition and singular value
			decomposition. Stay tuned!
		</p>

		<p>
			The <A href="https://knowyourmeme.com/memes/maxwell-the-cat-spinning-cat"
				>Maxwell the Cat</A
			> model was taken from <A href="https://leodog896.github.io/maxwell/"
				>here</A
			>.
		</p>
	</section>
</footer>
