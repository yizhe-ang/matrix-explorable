<script>
	// import Grid from "./Grid.svelte";
	import { Grid } from "@threlte/extras";
	import { useTweakpane } from "$utils/useTweakpane";
	import BasisVectors from "./BasisVectors.svelte";
	import { T } from "@threlte/core";
	import { gsap, ScrollTrigger } from "$utils/gsap.js";
	import Points from "./Points.svelte";
	import Sphere from "./Sphere.svelte";
	import Circle from "./Circle.svelte";

	export let mathbox;

	const gridColor = "#71717a";
	const axisColor = "#d4d4d8";

	// Set this to the z-position of the camera
	mathbox.set("focus", 1.2);

	// Set up coordinate system
	const dim = 15;
	const range = [
		[-dim, dim],
		[-dim, dim],
		[-dim, dim]
	];
	const view = mathbox.cartesian({
		range
	});

	const transformedView = view.transform();

	// States
	const initMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const state = {
		matrix: initMatrix,
		endMatrix: [...initMatrix]
	};

	// Inputs
	const { pane, action, addInput, addButton } = useTweakpane({});

	const xBasis = addInput({
		label: "x",
		value: { x: 2, y: 0, z: 0 },
		params: { y: { inverted: true } }
	});

	const yBasis = addInput({
		label: "y",
		value: { x: 1, y: 1, z: 0 },
		params: { y: { inverted: true } }
	});

	const zBasis = addInput({
		label: "z",
		value: { x: -1, y: 1, z: 1 },
		params: { y: { inverted: true } }
	});

	const t = addInput({
		label: "t",
		value: 0,
		params: {
			min: 0,
			max: 1
		}
	});

	// Play matrix transformation
	addButton({
		title: "play",
		onClick: play
	});

	// Matrix animation
	const matrixTween = gsap.to(state.matrix, {
		ease: "power2.inOut",
		duration: 2,
		paused: true,
		endArray: state.endMatrix,
		onUpdate() {
			state.matrix = state.matrix;

			$t = this.progress();
		},
		onComplete() {
			this.pause();
		}
	});

	// Update
	$: transformedView.set("matrix", state.matrix);

	// Sync playhead
	$: {
		matrixTween.progress($t);
		state.matrix = state.matrix;
	}

	function play() {
		matrixTween.play();
		console.log("play");
	}

	// Update
	$: onBasisChange($xBasis, $yBasis, $zBasis);
	function onBasisChange(xBasis, yBasis, zBasis) {
		// Update end matrices
		state.endMatrix[0] = xBasis.x;
		state.endMatrix[1] = yBasis.x;
		state.endMatrix[2] = zBasis.x;

		state.endMatrix[4] = xBasis.y;
		state.endMatrix[5] = yBasis.y;
		state.endMatrix[6] = zBasis.y;

		state.endMatrix[8] = xBasis.z;
		state.endMatrix[9] = yBasis.z;
		state.endMatrix[10] = zBasis.z;

		// Update tween
		matrixTween.invalidate();
		console.log(matrixTween);
		// matrixTween.progress(matrixTween.progress())
		state.matrix = state.matrix;
	}

	// Grid props
	const gridCellSize = 0.066; // HACK
	const gridSectionSize = 0.8;

	const gridProps = {
		cellSize: gridCellSize,
		cellColor: "#3f3f46",
		cellThickness: 1.5,
		sectionSize: gridSectionSize,
		sectionColor: "#52525b",
		sectionThickness: 3,
		infiniteGrid: true,
		fadeDistance: 3,
		fadeStrength: 3
	};
</script>

<!-- Peripherals -->
<BasisVectors view={transformedView} />
<!-- <Grid {view} {dim} opacity={0.2} {gridColor} {axisColor} />
<Grid view={transformedView} {dim} {gridColor} {axisColor} /> -->
<T.Group matrix={state.matrix} matrixAutoUpdate={false}>
	<Grid axes={"xyz"} {...gridProps} />
	<Grid
		position.y={gridSectionSize}
		axes={"xzy"}
		{...gridProps}
		fadeDistance={2}
	/>
	<Grid
		position.x={gridSectionSize}
		axes={"zyx"}
		{...gridProps}
		fadeDistance={2}
	/>
</T.Group>

<!-- Data -->
<!-- <Points view={transformedView} /> -->
<Sphere view={transformedView} />
<!-- <Circle view={transformedView} /> -->
