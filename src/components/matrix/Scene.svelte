<script>
	// https://github.com/unconed/mathbox/blob/master/examples/test/context.html
	import { T, useFrame, useThrelte } from "@threlte/core";
	import { OrbitControls, Grid } from "@threlte/extras";
	import * as MathBox from "mathbox";
	import { onMount } from "svelte";
	import Arcade from "./Arcade.svelte";
	import { gsap } from "$utils/gsap.js";
	import { sceneMounted } from "$stores";

	const { size, scene, camera, renderer } = useThrelte();

	// MathBox context
	const context = new MathBox.Context(renderer, scene, $camera).init();
	const mathbox = context.api;

	let cameraPos = [0, 0, 30];

	useFrame(() => {
		context.frame();
	});

	onMount(() => {
		// FIXME: Set size responsively?
		context.resize({ viewWidth: $size.width, viewHeight: $size.height });

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#section-1",
					start: "top bottom",
					end: "+=500",
					scrub: 1
				}
			})
			.to(cameraPos, {
				endArray: [0, 0, 10],
				onUpdate: function () {
					cameraPos = cameraPos;
				}
			})
			.to(
				"#article",
				{
					// width: "-=65ch"
					translateX: "-=65ch"
					// translateX: "calc(-50ch-80px)"
				},
				"<"
			)
			.to(
				"#canvas-wrapper",
				{
					// width: "-=65ch",
					translateX: "-=32.5ch"
				},
				"<"
			);

    $sceneMounted = true
	});
</script>

<!-- Set up camera and lighting -->
<T.PerspectiveCamera makeDefault position={cameraPos} near={0.01}>
	<!-- TODO: Look for better controls? -->
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<!-- TODO: Try post-processing -->

<!-- TODO: Depth-of-field? -->
<!-- TODO: Make objects further away darker, out of focus -->
<!-- TODO: Make the scene more 3D realistic -->

<!-- <Grid
	cellSize={0.5}
	cellColor={'#3f3f46'}
	cellThickness={1.5}
	sectionSize={5}
	sectionColor={'#52525b'}
	sectionThickness={3}
	infiniteGrid
	fadeDistance={50}
	fadeStrength={3}
/> -->

<Arcade {mathbox} />
