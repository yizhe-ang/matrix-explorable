<script>
	import { titleMounted, showHero, endMatrix } from "$stores";
	import { egEndMatrix } from "$data/variables";
	import { gsap } from "$utils/gsap.js";
	import { onMount } from "svelte";

	let mounted = false;

	$: if (mounted) animate();

	onMount(() => {
		mounted = true;
	});

	function animate() {
		// Animate title
		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#title",
					start: "top top",
					scrub: 1,
					onLeave: () => {
						// HACK:
						$showHero = false;
						// $endMatrix = egEndMatrix
					},
					onEnterBack: () => {
						$showHero = true;
					}
				}
			})
			.to("#title", {
				autoAlpha: 0
			});

		$titleMounted = true;
	}
</script>

<div
	id="title"
	class="fixed top-0 left-0 right-0 z-10 grid place-content-center pt-16"
>
	<div class="flex flex-col gap-5 items-center">
		<h1 class="text-8xl">The Matrix Arcade</h1>
		<div class="text-3xl">A Visual Explorable of Matrix Transformations</div>
	</div>
</div>
