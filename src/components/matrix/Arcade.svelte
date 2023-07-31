<script>
	// import Grid from "./Grid.svelte";
	import { Grid } from "@threlte/extras";
	import { useTweakpane } from "$utils/useTweakpane";
	import { T } from "@threlte/core";
	import Points from "./Points.svelte";
	import Sphere from "./Sphere.svelte";
	import Circle from "./Circle.svelte";
	import { endMatrix, playhead, playToggle, matrixTween } from "$stores";
	import Vector from "./Vector.svelte";
	import { ScrollTrigger, gsap } from "$utils/gsap.js";
	import { onMount } from "svelte";
	import { sceneMounted, titleMounted, loaded } from "$stores";
	import { colorVector, colorX, colorY, colorZ } from "$data/variables";

	export let mathbox;

	let mounted;

	const gridColor = "#71717a";
	const axisColor = "#d4d4d8";

	// Set this to the z-position of the camera
	// mathbox.set("focus", 1);

	// Set up coordinate system
	const dim = 1;
	const range = [
		[-dim, dim],
		[-dim, dim],
		[-dim, dim]
	];
	const view = mathbox.cartesian({
		range
	});

	// States
	const startMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	let matrix = [...startMatrix];

	// const transformedView = view.transform();
	// FIXME: Or should I just set manually?
	const transformedView = view.transform({}, { matrix: () => matrix });

	// Inputs
	// const { pane, action, addInput, addButton } = useTweakpane({});

	// Matrix animation
	// TODO: Make the ease linear
	// So that the playhead corresponds to the animation progress
	// Tween the animation's progress separately instead
	$matrixTween = gsap.to(matrix, {
		ease: "power2.inOut",
		duration: 2,
		paused: true,
		endArray: $endMatrix,
		onUpdate() {
			$playhead = this.progress();
			matrix = matrix;
		},
		onComplete() {
			// play icon
			$playToggle = true;
		}
	});

	// Update
	$: onMatrixChange($endMatrix);
	let nudgeFlag = true;
	function onMatrixChange(endMatrix) {
		// Reset matrix?
		matrix.forEach((_, i) => {
			matrix[i] = startMatrix[i];
		});

		// Update tween
		$matrixTween.invalidate();

		// HACK: Nudge
		const nudgeAmt = nudgeFlag ? 0.0001 : -0.0001;
		$matrixTween.progress($matrixTween.progress() + nudgeAmt);
		nudgeFlag = !nudgeFlag;

		matrix = matrix;
	}

	// Grid props
	const gridCellSize = 1;
	const gridSectionSize = 5;

	const gridProps = {
		cellSize: gridCellSize,
		cellColor: "#3f3f46",
		cellThickness: 1.5,
		sectionSize: gridSectionSize,
		sectionColor: "#52525b",
		sectionThickness: 3,
		infiniteGrid: true,
		fadeDistance: 30,
		fadeStrength: 5
	};

	const altFadeDistance = 20;

	// ScrollTrigger
	const delay = 0.5;

	let vectorCoords = [0, 0, 0, 0, 0, 0];
	let xCoords = [0, 0, 0, 0, 0, 0];
	let yCoords = [0, 0, 0, 0, 0, 0];
	let zCoords = [0, 0, 0, 0, 0, 0];

	let props = {
		vectorTexOpacity: 0,
		xTexOpacity: 0,
		yTexOpacity: 0,
		zTexOpacity: 0
	};

	const stProps = {
		// pin: "#section-1",
		// pin: "#article",
		pin: true,
		start: "center center",
		scrub: 1,
		pinSpacing: true,
		toggleClass: "active",
		onEnter: function () {
			animateInStProgress();
		},
		onLeave: function () {
			animateOutStProgress();
		},
		onEnterBack: function () {
			animateInStProgress();
		},
		onLeaveBack: function () {
			animateOutStProgress();
		}
	};

	const timelineProps = {
		onUpdate: function () {
			updateStProgress(this.progress());
		}
	};

	const scrollUnit = 1_000;

	function animate() {
    console.log('animate')
		// gsap
		// 	.timeline({
		// 		...timelineProps,
		// 		scrollTrigger: {
		// 			...stProps,
		// 			trigger: "#st-1",
		// 			end: `+=${scrollUnit * 1}`,
		// 		}
		// 	})
		// 	// Animate in vector
		// 	.to(vectorCoords, {
		// 		endArray: [0, 0, 0, -1, 2, 0],
		// 		onUpdate: function () {
		// 			vectorCoords = vectorCoords;
		// 		},
		// 		delay
		// 	})
		// 	.to(props, {
		// 		vectorTexOpacity: 1,
		// 		onUpdate: function () {
		// 			props = props;
		// 		}
		// 	});

		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-2",
					end: `+=${scrollUnit * 3}`
				}
			})
			// Animate in basis vectors
			.to(xCoords, {
				endArray: [0, 0, 0, 1, 0, 0],
				onUpdate: function () {
					xCoords = xCoords;
          console.log("test")
				},
				delay
			})
			.to(
				yCoords,
				{
					endArray: [0, 0, 0, 0, 1, 0],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"<"
			)
			.to(props, {
				xTexOpacity: 1,
				onUpdate: function () {
					props = props;
				}
			})
			.to(
				props,
				{
					yTexOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"<"
			)
			// Scale basis vectors to example vector
			.to(props, {
				xTexOpacity: 0,
				onUpdate: function () {
					props = props;
				},
				delay
			})
			.to(
				props,
				{
					yTexOpacity: 0,
					onUpdate: function () {
						props = props;
					}
				},
				"<"
			)
			.to(xCoords, {
				endArray: [0, 0, 0, -1, 0, 0],
				onUpdate: function () {
					xCoords = xCoords;
				},
				delay
			})
			.to(yCoords, {
				endArray: [0, 0, 0, 0, 2, 0],
				onUpdate: function () {
					yCoords = yCoords;
				},
				delay
			})
			.to(yCoords, {
				endArray: [-1, 0, 0, -1, 2, 0],
				onUpdate: function () {
					yCoords = yCoords;
				},
				delay
			})
			.to(
				{},
				{
					duration: delay * 2
				}
			);
	}

	function updateStProgress(progress) {
		gsap.set("#st-progress", {
			scaleY: progress
		});
	}
	function animateInStProgress() {
		gsap.to("#st-progress", {
			opacity: 1,
			duration: 0.5
		});
	}
	function animateOutStProgress() {
		gsap.to("#st-progress", {
			opacity: 0,
			duration: 0.5
		});
	}

  // TODO: Make sure ScrollTriggers are in order
  // DOM / Layout is already mounted
	// $: if (mounted && $titleMounted && $sceneMounted) animate();
	// $: if (loaded && $titleMounted && $sceneMounted) animate();
	$: if (loaded) animate();

	onMount(() => {
		mounted = true;
	});
</script>

<!-- Example vector -->
<Vector
	view={transformedView}
	coords={vectorCoords}
	color={colorVector}
	texOpacity={props.vectorTexOpacity}
/>
<!-- Basis vectors -->
<Vector
	view={transformedView}
	coords={xCoords}
	color={colorX}
	texOpacity={props.xTexOpacity}
/>
<Vector
	view={transformedView}
	coords={yCoords}
	color={colorY}
	texOpacity={props.yTexOpacity}
/>
<!-- <Vector view={transformedView} coords={zCoords} color={colorZ} /> -->

<!-- Peripherals -->
<!-- <Grid {view} {dim} opacity={0.2} {gridColor} {axisColor} />
<Grid view={transformedView} {dim} {gridColor} {axisColor} /> -->

<T.Group {matrix} matrixAutoUpdate={false}>
	<!-- FIXME: Don't do infinite grid? A bit confusing -->
	<Grid axes={"xyz"} {...gridProps} />
	<Grid
		position.y={gridSectionSize}
		axes={"xzy"}
		{...gridProps}
		fadeDistance={altFadeDistance}
		visible={false}
	/>
	<Grid
		position.x={gridSectionSize}
		axes={"zyx"}
		{...gridProps}
		fadeDistance={altFadeDistance}
		visible={false}
	/>
</T.Group>

<!-- Data -->
<!-- <Points view={transformedView} /> -->
<!-- <Sphere view={transformedView} /> -->
<!-- <Circle view={transformedView} /> -->
