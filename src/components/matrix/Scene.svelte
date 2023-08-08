<script>
	// https://github.com/unconed/mathbox/blob/master/examples/test/context.html
	import { T, useFrame, useThrelte, extend, useRender } from "@threlte/core";
	import { OrbitControls, Grid } from "@threlte/extras";
	import * as MathBox from "mathbox";
	import { onMount } from "svelte";
	import Arcade from "./Arcade.svelte";
	import { gsap } from "$utils/gsap.js";
	import {
		sceneMounted,
		cameraControls,
		afterImageEnabled,
		cameraAutoRotate
	} from "$stores";
	import * as THREE from "three";
	import CameraControls from "camera-controls";
	import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
	import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
	import { AfterimagePass } from "three/addons/postprocessing/AfterimagePass.js";
	import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
	import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
	import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
	import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
	// import { EffectComposer, RenderPass } from "postprocessing";

	CameraControls.install({ THREE: THREE });

	extend({
		CameraControls
	});

	const { size, scene, camera, renderer } = useThrelte();

	scene.background = new THREE.Color("hsl(231, 15%, 4%)");

	// MathBox context
	const context = new MathBox.Context(renderer, scene, $camera).init();
	const mathbox = context.api;

	const cameraPos = [0, 0, 30];

	// FIXME: Can replace with the postprocessing library?
	let composer;

	const afterImagePass = new AfterimagePass();
	// $: afterImagePass.enabled = $afterImageEnabled;

	function setupEffectComposer(camera) {
		composer = new EffectComposer(renderer);

		// FIXME: Have to set size and pixel ratio?
		composer.addPass(new RenderPass(scene, camera));

		// FIXME: Keep afterimage for some animations?
		// FIXME: Why does afterimage make the colors brighter?
		composer.addPass(afterImagePass);

		const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
		composer.addPass(gammaCorrectionPass);

		// const outputPass = new OutputPass();
		// composer.addPass(outputPass);

		const smaaPass = new SMAAPass();
		composer.addPass(smaaPass);
	}

	$: setupEffectComposer($camera);

	// Post-processing
	useRender((_, delta) => {
		composer.render(delta);
	});

	useFrame(({}, delta) => {
		// TODO: Camera auto-rotate
		if ($cameraAutoRotate) {
			$cameraControls.azimuthAngle += 10 * delta * THREE.MathUtils.DEG2RAD;
			// Normalize
			$cameraControls.azimuthAngle =
				$cameraControls.azimuthAngle % (2 * Math.PI);
		}

		$cameraControls.update(delta);

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
			.to($cameraControls, {
				distance: 15,
				onComplete: function () {
					// Update default camera position
					$cameraControls.saveState();
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
			)
			.to(afterImagePass.uniforms.damp, {
				value: 0,
				duration: 0.001
			});

		$sceneMounted = true;
	});
</script>

<!-- Set up camera and lighting -->
<T.PerspectiveCamera let:ref makeDefault position={cameraPos} near={0.01}>
	<!-- TODO: Look for better controls? -->
	<!-- <OrbitControls enableDamping /> -->
	<!-- TODO: Change touch controls -->
	<T.CameraControls
		bind:ref={$cameraControls}
		args={[ref, renderer.domElement]}
		mouseButtons.left={CameraControls.ACTION.TRUCK}
		mouseButtons.right={CameraControls.ACTION.NONE}
		on:update={(e) => {
			// console.log(e)
		}}
	/>
</T.PerspectiveCamera>

<!-- TODO: Try post-processing -->
<!-- TODO: Afterimage -->
<!-- TODO: Grainy effects -->

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
