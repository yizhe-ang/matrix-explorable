<script>
	// https://github.com/unconed/mathbox/blob/master/examples/test/context.html
	import { T, useFrame, useThrelte, extend, useRender } from "@threlte/core";
	import * as MathBox from "mathbox";
	import { onMount } from "svelte";
	import Arcade from "./Arcade.svelte";
	import { gsap } from "$utils/gsap.js";
	import {
		sceneMounted,
		cameraControls,
		cameraAutoRotate,
		show3d,
		debug,
		resetViewToggle,
		rgbShiftEnabled,
		gridToggled,
		transformedGridToggled,
		showHero,
    afterImageEnabled
	} from "$stores";
	import mq from "$stores/mq";
	import * as THREE from "three";
	import CameraControls from "camera-controls";
	import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
	import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
	import { AfterimagePass } from "three/addons/postprocessing/AfterimagePass.js";
	import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
	import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
	import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
	import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
	import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

	let mounted = false;

	const cameraPan = 10;
	const minPan = new THREE.Vector3(-cameraPan, -cameraPan, -cameraPan);
	const maxPan = new THREE.Vector3(cameraPan, cameraPan, cameraPan);
	const _v = new THREE.Vector3();

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
	$: afterImagePass.enabled = $afterImageEnabled;

	const rgbShiftPass = new ShaderPass(RGBShiftShader);
	rgbShiftPass.uniforms["amount"].value = 0.0015;
	$: rgbShiftPass.enabled = $rgbShiftEnabled;

	function setupEffectComposer(camera) {
		composer = new EffectComposer(renderer);

		// FIXME: Have to set size and pixel ratio?
		composer.addPass(new RenderPass(scene, camera));

		// FIXME: Disable this if not needed?
		composer.addPass(afterImagePass);

		// composer.addPass(rgbShiftPass);

		// const halfTonePass = new HalftonePass(halfToneParams);
		// composer.addPass(halfTonePass);

		const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
		composer.addPass(gammaCorrectionPass);

		// const outputPass = new OutputPass();
		// composer.addPass(outputPass);

		// const smaaPass = new SMAAPass();
		// composer.addPass(smaaPass);
	}

	$: setupEffectComposer($camera);

	// Post-processing
	useRender((_, delta) => {
		composer.render(delta);
	});

	useFrame(({}, delta) => {
		// TODO: Camera auto-rotate
		if ($cameraAutoRotate) {
			$cameraControls.azimuthAngle += 5 * delta * THREE.MathUtils.DEG2RAD;
			// Normalize
			$cameraControls.azimuthAngle =
				$cameraControls.azimuthAngle % (2 * Math.PI);
		}

		$cameraControls.update(delta);

		context.frame();
	});

	$: if (mounted && $mq.lg) animate();

	onMount(() => {
		// FIXME: Set size responsively?
		context.resize({ viewWidth: $size.width, viewHeight: $size.height });

		mounted = true;
	});

	function animate() {
		gsap.set("#title", {
			transformPerspective: 400
		});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#title-spacer",
					start: "top top",
					end: "+=2000",
					scrub: 1,
					onLeave: () => {
						($gridToggled = true), ($transformedGridToggled = false);
						$showHero = false;
					},
					onLeaveBack: () => {
						($gridToggled = false), ($transformedGridToggled = true);
						$showHero = true;
					}
				}
			})
			.add("step-1")
			.fromTo(
				$cameraControls,
				{
					distance: 15,
					polarAngle: Math.PI * 0.35
					// azimuthAngle: Math.PI * 0.3
				},
				{
					polarAngle: 0,
					azimuthAngle: 0
				},
				"step-1"
			)
			.to(
				"#title",
				{
					rotationX: -70,
					transformOrigin: "50% 100%, 200",
					autoAlpha: 0
				},
				"step-1"
			);

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#tex-1",
					start: "top 60%"
				}
			})
			.from("#tex-1 span", {
				opacity: 0,
				stagger: {
					amount: 0.5
				}
			});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#tex-2",
					start: "top 60%"
				}
			})
			.from("#tex-2 span", {
				opacity: 0,
				stagger: {
					amount: 0.5
				}
			});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#section-1",
					start: "top bottom",
					end: "+=500",
					scrub: 1,
          // Remove after image postprocessing
          onLeave: () => $afterImageEnabled = false,
          onEnterBack: () => $afterImageEnabled = true
				}
			})
			.add("step-1")
			.to(
				$cameraControls,
				{
					distance: 15,
					onComplete: function () {
						// Update default camera position
						$cameraControls.saveState();
					}
				},
				"step-1"
			)
			.to(
				"#article",
				{
					// width: "-=65ch"
					// translateX: "-=65ch"
					translateX: "-65ch"
					// translateX: "calc(-50ch-80px)"
				},
				"step-1"
			)
			.to(
				"#canvas-wrapper",
				{
					// width: "-=65ch",
					translateX: "-32.5ch"
				},
				"step-1"
			)
      // Remove after image postprocessing
			// .to(afterImagePass.uniforms.damp, {
			// 	value: 0,
			// 	duration: 0.001
			// });

		$sceneMounted = true;
	}

	$: if ($debug) afterImagePass.uniforms.damp = 0;

	// Reset camera view
	$: if ($cameraControls) resetView($resetViewToggle);
	function resetView(toggle) {
		if ($show3d) {
			$cameraControls.rotateTo(Math.PI * 0.3, Math.PI * 0.35, true);
			// $cameraControls.dollyTo(8.5, true);
			$cameraControls.dollyTo(15, true);
			$cameraControls.moveTo(0, 0, 0, true);
		} else {
			$cameraControls.rotateTo(0, 0, true);
			$cameraControls.dollyTo(15, true);
			$cameraControls.moveTo(0, 0, 0, true);
		}
	}
</script>

<!-- Set up camera and lighting -->
<T.PerspectiveCamera
	let:ref
	makeDefault
	position={cameraPos}
	near={2}
	far={300}
>
	<!-- TODO: Look for better controls? -->
	<!-- <OrbitControls enableDamping /> -->
	<!-- TODO: Change touch controls -->
	<T.CameraControls
		bind:ref={$cameraControls}
		args={[ref, renderer.domElement]}
		minDistance={5}
		maxDistance={100}
		mouseButtons.left={CameraControls.ACTION.TRUCK}
		mouseButtons.right={$show3d
			? CameraControls.ACTION.ROTATE
			: CameraControls.ACTION.NONE}
		on:controlstart={() => {
			if ($cameraControls.currentAction == CameraControls.ACTION.ROTATE) {
				renderer.domElement.classList.add("dragging");
			} else if ($cameraControls.currentAction == CameraControls.ACTION.TRUCK) {
				renderer.domElement.classList.add("moving");
			} else if ($cameraControls.currentAction == CameraControls.ACTION.DOLLY) {
				renderer.domElement.classList.add("zoomIn");
			}
		}}
		on:controlend={() => {
			renderer.domElement.classList.remove("dragging", "moving");
		}}
		on:update={() => {
			// Limit pan
			_v.copy($cameraControls._target);
			$cameraControls._target.clamp(minPan, maxPan);
			_v.sub($cameraControls._target);
			$cameraControls._camera.position.sub(_v);
		}}
	/>
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.8} />
<!-- <T.DirectionalLight position={[0, 0, 20]} /> -->

<!-- TODO: Try post-processing -->
<!-- TODO: Afterimage -->
<!-- TODO: Grainy effects -->

<!-- TODO: Depth-of-field? -->
<!-- TODO: Make objects further away darker, out of focus -->
<!-- TODO: Make the scene more 3D realistic -->

<Arcade {mathbox} />

<style lang="postcss">
	:global(canvas) {
		/* cursor: grab; */
		cursor: move;

		&.dragging {
			cursor: grabbing;
		}

		&.moving {
			cursor: move;
		}

		&.zoomIn {
			cursor: zoom-in;
		}
	}
</style>
