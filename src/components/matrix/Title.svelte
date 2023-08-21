<script>
	import { colorVector } from "$data/variables";
	import { titleMounted, showHero, endMatrix, loaded } from "$stores";
	import { playgroundSt, dataToggled } from "$stores";
	import { gsap } from "$utils/gsap.js";
	import { onMount } from "svelte";
	import { RingLoader } from "svelte-loading-spinners";
	import mq from "$stores/mq";
	import B from "./B.svelte";
	import { Mouse } from "lucide-svelte";

	// TODO: Colorful gradient shadows
	// TODO: Get inspiration from decoration

	// TODO: To scroll down indicator

	// let mounted = false;

	// $: if (mounted) animate();

	// onMount(() => {
	// 	mounted = true;
	// });

	// function animate() {
	// Animate title
	// gsap
	// 	.timeline({
	// 		scrollTrigger: {
	// 			trigger: "#title",
	// 			start: "top top",
	// 			scrub: 1,
	// 			onLeave: () => {
	// 				// HACK:
	// 				$showHero = false;
	// 				// $endMatrix = egEndMatrix
	// 			},
	// 			onEnterBack: () => {
	// 				$showHero = true;
	// 			}
	// 		}
	// 	})
	// 	// .to("#title", {
	// 	// 	autoAlpha: 0
	// 	// });

	// $titleMounted = true;
	// }
</script>

<div
	id="title"
	class="relative lg:fixed lg:top-0 lg:left-0 lg:right-0 z-10 grid place-content-center pt-16 px-10 max-w-5xl mx-auto"
>
	<!-- TODO: Vertically center everything here? -->
	<div class="flex flex-col gap-5 items-center relative">
		<h1 class="text-7xl sm:text-8xl md:text-9xl font-display drop-shadow-xl">
			The <br /> Matrix Arcade
		</h1>
		<div class="text-2xl md:text-3xl font-displayAlt text-right">
			A Visual Explorable <br /> of Matrix Transformations
		</div>

		<div
			class="relative md:absolute top-0 right-0 font-displayAlt text-2xl sm:text-3xl md:text-4xl"
		>
			By <a
				href="https://yizhe-ang.github.io/"
				target="_blank"
				rel="noopener noreferrer"
				class="underline decoration-2 underline-offset-8 decoration-neutral text-secondary"
				>Yi Zhe Ang</a
			>
		</div>

		<div class="relative hidden lg:flex flex-col items-center gap-5 mt-5">
			<div class="flex flex-col items-center gap-2">
				<div class="animate-bounce">
					<Mouse size={48} />
				</div>
				<div class="font-sansAlt text-xl">Scroll down</div>
			</div>
			<div class="font-sansAlt text-md text-neutral-content">Or</div>

			<!-- {#if $loaded} -->
			<button
				class="relative playground-btn btn font-sansAlt text-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 border-0"
				on:click={() => {
					// const target = document.querySelector('#st-12')

					// target?.scrollIntoView()

					// gsap.to(window, {
					// 	scrollTo: () => "#st-13"
					// });

					gsap.to(window, {
						scrollTo: {
							// y: $playgroundSt.end,
							y: $playgroundSt.start
						},
						duration: 1
					});

					// HACK:
					// $dataToggled = "points"
					// $dataToggled = undefined
					// $dataToggled = "model"

					// gsap.set(window, {
					// 	scrollTo: {
					// 		// y: $playgroundSt.end,
					// 		y: $playgroundSt.start
					// 	}
					// });
				}}
			>
				Skip to Playground!
			</button>
			<!-- {:else} -->
			<!-- <RingLoader color={colorVector} /> -->
			<!-- {/if} -->
		</div>
		<div
			class="relative alert bg-transparent border-0 flex flex-col mt-10 lg:hidden"
		>
			<div class="text-xl sm:text-2xl text-center w-64 sm:w-96">
				Whoops! This interactive is better viewed on <B>desktop</B> with a <B
					>larger screen</B
				>!
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.playground-btn {
		&:before {
			content: "";
			z-index: -1;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			/* background: linear-gradient(-45deg, #fff000 0%, #ed008c 100%); */
			background: linear-gradient(-45deg, #fefedf 0%, #c493ff 100%);
			transform: translate3d(0px, 20px, 0) scale(0.95);
			filter: blur(20px);
			/* opacity: var(0.7); */
			opacity: 0.6;
			transition: opacity 0.3s;
			border-radius: inherit;
		}

		&:hover {
			&:before {
				opacity: 1;
			}
		}
		/*
* Prevents issues when the parent creates a
* stacking context. (For example, using the transform
* property )
*/
		&::after {
			content: "";
			z-index: -1;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: inherit;
			border-radius: inherit;
		}
	}

	.alert {
		&:before {
			content: "";
			z-index: -1;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			/* background: linear-gradient(-45deg, #fff000 0%, #ed008c 100%); */
			background: linear-gradient(-45deg, #fefedf 0%, #c493ff 100%);
			transform: translate3d(0px, 0px, 0) scale(0.95);
			filter: blur(20px);
			/* opacity: var(0.7); */
			opacity: 0.6;
			transition: opacity 0.3s;
			border-radius: inherit;
		}

		/*
* Prevents issues when the parent creates a
* stacking context. (For example, using the transform
* property )
*/
		&::after {
			content: "";
			z-index: -1;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: inherit;
			border-radius: inherit;
		}
	}
</style>
