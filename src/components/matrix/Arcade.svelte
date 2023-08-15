<script>
	// import Grid from "./Grid.svelte";
	import { Grid, useGltf, useTexture } from "@threlte/extras";
	import { useTweakpane } from "$utils/useTweakpane";
	import { T, useThrelte } from "@threlte/core";
	import Points from "./Points.svelte";
	import Sphere from "./Sphere.svelte";
	import Circle from "./Circle.svelte";
	import Planes from "./Planes.svelte";
	import Plane from "./Plane.svelte";
	import Grid3d from "./Grid3d.svelte";
	import Sky from "./Sky.svelte";
	import Gridlines from "./Gridlines.svelte";
	import {
		endMatrix,
		playhead,
		playToggle,
		matrixTween,
		gridToggled,
		grid3dToggled,
		transformedGridToggled,
		dataToggled,
		showHero,
		heroMatrix,
		afterImageEnabled,
		cameraAutoRotate,
		show3d,
		showPlayground,
		customMatrix,
		debug,
		inputVectorToggled,
		rgbShiftEnabled,
		resetViewToggle
	} from "$stores";
	import Vector from "./Vector.svelte";
	import { ScrollTrigger, gsap } from "$utils/gsap.js";
	import { onMount } from "svelte";
	import {
		sceneMounted,
		titleMounted,
		loaded,
		cameraProps,
		cameraControls,
		playgroundSt,
		vectorCoordsInput
	} from "$stores";
	import {
		colorVector,
		colorX,
		colorY,
		colorZ,
		egVector,
		egMatrixX,
		egMatrixY,
		egOutputVector,
		eg3dMatrix,
		eg3dMatrixX,
		eg3dMatrixY,
		eg3dMatrixZ,
		eg3dVector,
		eg3dOutputVector,
		egEndMatrix,
		initMatrix,
		colorGrid,
		colorGridAlt
	} from "$data/variables";
	import colors from "tailwindcss/colors";
	import CameraControls from "camera-controls";
	import {
		Color,
		MeshBasicMaterial,
		PlaneGeometry,
		SRGBColorSpace,
		sRGBEncoding
	} from "three";
	import Hero from "./Hero.svelte";
	import { spring } from "svelte/motion";

  $: console.log($vectorCoordsInput)

	export let mathbox;

	const map = useTexture("/maxwell.jpg");
	$: if ($map) $map.encoding = sRGBEncoding;

	const model = useGltf("/maxwell.glb");

	let mounted;

	// Set this to the z-position of the camera
	// mathbox.set("focus", 15);
	mathbox.set("focus", 20);

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

	const planeDim = 10;

	// States
	const startMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	// Object that gets animated
	let matrix = [...startMatrix];
	// `$endMatrix` records the final state of the matrix

	// const transformedView = view.transform();
	// FIXME: Or should I just set manually?
	// const transformedView = view.transform({}, { matrix: () => matrix });
	const transformedView = view.transform();

	// Matrix animation
	// TODO: Make the ease linear
	// So that the playhead corresponds to the animation progress
	// Tween the animation's progress separately instead
	$matrixTween = gsap.to(matrix, {
		ease: "linear",
		duration: 2,
		paused: true,
		endArray: $endMatrix,
		onUpdate() {
			// Sync playhead with animation progress
			$playhead = this.progress();
			matrix = matrix;
		},
		onComplete() {
			// Toggle play icon
			$playToggle = true;
			// FIXME:
			this.pause();
		}
	});
	// $matrixTween.progress(1);

	// FIXME: Setting $endMatrix directly doesn't work for some reason
	// FIXME: Use different matrix transformation states during narrative, and during interaction time
	$: onMatrixChange($endMatrix);

	let nudgeFlag = true;

	// FIXME: This has to run first!!
	function onMatrixChange(endMatrix) {
		// Reset matrix
		matrix.forEach((_, i) => {
			matrix[i] = startMatrix[i];
		});

		// Update tween
		$matrixTween.invalidate();

		// HACK: Nudge
		const nudgeAmt = nudgeFlag ? 0.0001 : -0.0001;
		$matrixTween.progress($matrixTween.progress() + nudgeAmt);
		nudgeFlag = !nudgeFlag;

		// FIXME: Stays the same
		matrix = matrix;
	}

	// Use different states during interaction and during narrative
	const matrixTransform = spring(initMatrix);
	$: {
		if ($showHero) {
			$matrixTransform = $heroMatrix;
			// } else if (!$showPlayground) {
			// 	$matrixTransform = $customMatrix;
		} else {
			$matrixTransform = matrix;
		}
	}

	// Update transformed view
	$: transformedView.set("matrix", $matrixTransform);

	// $: console.log(matrixTransform)

	// Grid props
	const gridCellSize = 1;
	const gridSectionSize = 5;

	const defaultGridProps = {
		cellSize: gridCellSize,
		cellColor: colors.slate["700"],
		cellThickness: 1.5,
		sectionSize: gridSectionSize,
		sectionColor: colors.slate["700"],
		sectionThickness: 3,
		infiniteGrid: true
	};

	$: gridSettings = $show3d
		? {
				fadeDistance: 150,
				fadeStrength: 4
		  }
		: {
				fadeDistance: 50,
				fadeStrength: 5
		  };

	$: transformedGridSettings = $show3d
		? {
				fadeDistance: 150,
				fadeStrength: 4
		  }
		: {
				fadeDistance: 50,
				// fadeStrength: 5
				fadeStrength: 9
		  };

	let gridProps = {
		...defaultGridProps,
		// sectionThickness: 2.5,
		...gridSettings
	};

	let transformedGridProps = {
		...defaultGridProps,
		cellColor: colorGridAlt,
		sectionColor: colorGrid,
		...transformedGridSettings
	};

	let grid3dProps = {
		...defaultGridProps,
		infiniteGrid: false,
		cellColor: colorGridAlt,
		sectionColor: colorGrid,
		gridSize: [10, 10],
		t: 0
	};

	let gridVars = {
		fadeDistance: gridProps.fadeDistance,
		transformedFadeDistance: 0,
		fadeStrength: gridProps.fadeStrength,
		transformedFadeStrength: transformedGridProps.fadeStrength
	};

	// let grid3dProps = {
	// 	t: 0
	// };

	$: onGridToggle($gridToggled);
	function onGridToggle(toggled) {
		if (toggled) {
			gsap.to(gridProps, {
				fadeDistance: gridSettings.fadeDistance,
				onUpdate: function () {
					gridProps = gridProps;
				}
			});
		} else {
			gsap.to(gridProps, {
				fadeDistance: 0,
				onUpdate: function () {
					gridProps = gridProps;
				}
			});
		}
	}

	$: onTransformedGridToggle($transformedGridToggled);
	function onTransformedGridToggle(toggled) {
		if (toggled) {
			gsap.to(transformedGridProps, {
				fadeDistance: transformedGridSettings.fadeDistance,
				onUpdate: function () {
					transformedGridProps = transformedGridProps;
				}
			});
		} else {
			gsap.to(transformedGridProps, {
				fadeDistance: 0,
				onUpdate: function () {
					transformedGridProps = transformedGridProps;
				}
			});
		}
	}

	$: onGrid3dToggle($grid3dToggled);
	function onGrid3dToggle(toggled) {
		if (toggled) {
			gsap.to(grid3dProps, {
				t: 1,
				cellThickness: defaultGridProps.cellThickness,
				sectionThickness: defaultGridProps.sectionThickness,
				onUpdate: function () {
					grid3dProps = grid3dProps;
				}
			});
		} else {
			gsap.to(grid3dProps, {
				t: 0,
				cellThickness: 0,
				sectionThickness: 0,
				onUpdate: function () {
					grid3dProps = grid3dProps;
				}
			});
		}
	}

	const cachePlaygroundSettings = {
		dataToggled: undefined,
		gridToggled: true,
		transformedGridToggled: true
	};

	let prevDataToggled;
	$: onDataToggle($dataToggled);
	function onDataToggle(toggled) {
		// Animate out
		if (prevDataToggled == "points") {
			gsap.to(pointsProps, {
				t: 0,
				onUpdate: function () {
					pointsProps = pointsProps;
				}
			});
		} else if (prevDataToggled == "3d points") {
			gsap.to(points3dProps, {
				t: 0,
				onUpdate: function () {
					points3dProps = points3dProps;
				}
			});
		} else if (prevDataToggled == "planes") {
			gsap.to(planesProps, {
				t: 0,
				onUpdate: function () {
					planesProps = planesProps;
				}
			});
		} else if (prevDataToggled == "3d planes") {
			gsap.to(planes3dProps, {
				t: 0,
				onUpdate: function () {
					planes3dProps = planes3dProps;
				}
			});
		} else if (prevDataToggled == "model") {
			gsap.to(modelProps, {
				scale: 0,
				onUpdate: function () {
					modelProps = modelProps;
				}
			});
		} else if (prevDataToggled == "image") {
			gsap.to(imageProps, {
				scale: 0,
				onUpdate: function () {
					imageProps = imageProps;
				}
			});
		}

		// Animate in
		if (toggled == "points") {
			gsap.to(pointsProps, {
				t: 1,
				onUpdate: function () {
					pointsProps = pointsProps;
				}
			});
		} else if (toggled == "3d points") {
			gsap.to(points3dProps, {
				t: 1,
				onUpdate: function () {
					points3dProps = points3dProps;
				}
			});
		} else if (toggled == "planes") {
			gsap.to(planesProps, {
				t: 1,
				onUpdate: function () {
					planesProps = planesProps;
				}
			});
		} else if (toggled == "3d planes") {
			gsap.to(planes3dProps, {
				t: 1,
				onUpdate: function () {
					planes3dProps = planes3dProps;
				}
			});
		} else if (toggled == "model") {
			gsap.to(modelProps, {
				scale: 0.25,
				onUpdate: function () {
					modelProps = modelProps;
				}
			});
		} else if (toggled == "image") {
			gsap.to(imageProps, {
				scale: 1,
				onUpdate: function () {
					imageProps = imageProps;
				}
			});
		}

		// Update prev value
		prevDataToggled = toggled;
	}

	// Have a show 3d trigger?
	$: toggle3d($show3d);
	function toggle3d(toggle) {
		if ($gridToggled) {
			gsap.to(gridProps, {
				duration,
				fadeDistance: gridSettings.fadeDistance,
				fadeStrength: gridSettings.fadeStrength,
				onUpdate: () => (gridProps = gridProps)
			});
		}

		if ($transformedGridToggled) {
			gsap.to(transformedGridProps, {
				duration,
				fadeDistance: transformedGridSettings.fadeDistance,
				fadeStrength: transformedGridSettings.fadeStrength,
				onUpdate: () => (transformedGridProps = transformedGridProps)
			});
		}

		if ($showPlayground) {
			if (!$show3d) {
				// Hide any toggled 3d objects
				$dataToggled = undefined;
				onDataToggle(undefined);

				// Reset camera to 2d view
				$resetViewToggle = !$resetViewToggle;

				// Hide z basis vector
				basisAltProps.zVisible = false;

				// Remove z-coord of input vector
				$vectorCoordsInput[2] = 0;
			} else {
				basisAltProps.zVisible = true;
			}
		}
	}

	// ScrollTrigger
	const delay = 0.1;
	const transitionDuration = 0.1;

	let vectorCoords = [0, 0, 0, 0, 0, 0];
	let xCoords = [0, 0, 0, 0, 0, 0];
	let yCoords = [0, 0, 0, 0, 0, 0];
	let zCoords = [0, 0, 0, 0, 0, 0];

	const vectorCoordsSpring = spring([0, 0, 0]);
	$: $vectorCoordsSpring = $vectorCoordsInput;

	// FIXME: Do we have to set visibility to false?
	// Hide vector input on toggle
	$: onInputVectorToggle($inputVectorToggled);
	function onInputVectorToggle(toggled) {
		if (toggled) {
			$vectorCoordsSpring = $vectorCoordsInput;
		} else {
			$vectorCoordsSpring = [0, 0, 0];
		}
	}

	// TODO: Separate this?
	let props = {
		vectorTexOpacity: 0,
		xTexOpacity: 0,
		yTexOpacity: 0,
		zTexOpacity: 0,
		xScalar: 1,
		yScalar: 1,
		zScalar: 1,
		xScalarOpacity: 0,
		yScalarOpacity: 0,
		zScalarOpacity: 0,
		xScalarAlign: "top",
		yScalarAlign: "left",
		zScalarAlign: "bottom",
		vectorVisible: false,
		xVisible: true,
		yVisible: true,
		zVisible: true,
		xDim3: false,
		yDim3: false,
		zDim3: false,
		vectorDim3: false
	};

	let pointsProps = {
		t: 0
	};

	let planesProps = {
		t: 0
	};

	let points3dProps = {
		t: 0
	};

	let planes3dProps = {
		t: 0
	};
	let modelProps = {
		scale: 0
	};
	let imageProps = {
		scale: 0
	};

	let basisAltProps = {
		vectorVisible: true,
		xVisible: false,
		yVisible: false,
		zVisible: false
	};

	$: if ($debug) {
		basisAltProps.xVisible = true;
		basisAltProps.yVisible = true;
		basisAltProps.zVisible = true;
	}

	// $: basisAltProps.zVisible = $show3d;

	const stProps = {
		fastScrollEnd: true,
		pin: "#article",
		pinnedContainer: "#article",
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

	const stPropsAlt = {
		start: "bottom center",
		pinnedContainer: "#article",
		toggleActions: "play none none reverse",
		fastScrollEnd: true,
		end: 200
	};

	const timelineProps = {
		onUpdate: function () {
			updateStProgress(this.progress());
		}
	};

	const timelinePropsAlt = {
		ease: "power2.in"
	};

	const duration = 0.3;

	const scrollUnit = 1_000;

	function animate() {
		// FIXME: Review scroll amounts

		// Animate in vector
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-1",
					end: `+=${scrollUnit * 1}`,
					onEnter: () => {
						stProps.onEnter();

						($gridToggled = true), ($transformedGridToggled = false);

						$rgbShiftEnabled = false;
					},
					onLeaveBack: () => {
						stProps.onLeaveBack();

						($gridToggled = false), ($transformedGridToggled = true);

						$rgbShiftEnabled = true;
					}
				}
			})
			.to(vectorCoords, {
				endArray: [0, 0, 0, ...egVector, 0],
				onUpdate: function () {
					vectorCoords = vectorCoords;
				}
			})
			.to(props, {
				vectorTexOpacity: 1,
				onUpdate: function () {
					props = props;
				}
			})
			.to(
				{},
				{
					duration: delay
				}
			);

		// Animate in basis vectors
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-2",
					end: `+=${scrollUnit * 1}`
				}
			})
			.to(xCoords, {
				endArray: [0, 0, 0, 1, 0, 0],
				onUpdate: function () {
					xCoords = xCoords;
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
			.to(
				{},
				{
					duration: delay
				}
			);

		// Scale basis vectors to example vector
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-3",
					end: `+=${scrollUnit * 3}`,
					preventOverlaps: true
				}
			})
			// Animate out Tex
			.to(props, {
				xTexOpacity: 0,
				onUpdate: function () {
					props = props;
				}
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
			// Scale basis vectors
			.add("step-2")
			.to(
				props,
				{
					duration: 0.2,
					xScalarOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					duration: 0.2,
					yScalarOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to(
				xCoords,
				{
					endArray: [0, 0, 0, egVector[0], 0, 0],
					onUpdate: function () {
						xCoords = xCoords;
					}
				},
				"step-2"
			)
			.to(
				yCoords,
				{
					endArray: [0, 0, 0, 0, egVector[1], 0],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					xScalar: egVector[0],
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					yScalar: egVector[1],
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to({}, { duration: delay })
			// Shift y basis vector
			.add("step-3")
			.to(
				props,
				{
					duration: 0.2,
					xScalarOpacity: 0,
					onUpdate: function () {
						props = props;
					}
				},
				"step-3"
			)
			.to(
				props,
				{
					duration: 0.2,
					yScalarOpacity: 0,
					onUpdate: function () {
						props = props;
					}
				},
				"step-3"
			)
			.to(
				yCoords,
				{
					endArray: [egVector[0], 0, 0, ...egVector, 0],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"step-3"
			)
			.to({}, { duration: delay });

		// Animate basis vectors back
		gsap
			.timeline({
				scrollTrigger: {
					...stPropsAlt,
					trigger: "#st-3"
				},
				timelinePropsAlt
			})
			.add("step-1")
			// Reset scalar values
			.to(
				props,
				{
					duration,
					xScalar: 1,
					yScalar: 1
				},
				"step-1"
			)
			.to(
				xCoords,
				{
					duration,
					endArray: [0, 0, 0, 1, 0, 0],
					onUpdate: function () {
						xCoords = xCoords;
					}
				},
				"step-1"
			)
			.to(
				yCoords,
				{
					duration,
					endArray: [0, 0, 0, 0, 1, 0],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"step-1"
			)
			.to(props, {
				duration,
				xTexOpacity: 1,
				onUpdate: function () {
					props = props;
				}
			})
			.to(
				props,
				{
					duration,
					yTexOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"<"
			);

		// Transform to new basis vectors
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-4",
					end: `+=${scrollUnit * 1}`
				}
			})
			// Animate to new basis vectors
			.to(xCoords, {
				endArray: [0, 0, 0, ...egMatrixX, 0],
				onUpdate: function () {
					xCoords = xCoords;
				}
			})
			.to(
				yCoords,
				{
					endArray: [0, 0, 0, ...egMatrixY, 0],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"<"
			)
			// Animate to output vector
			.to(
				vectorCoords,
				{
					endArray: [0, 0, 0, ...egOutputVector, 0],
					onUpdate: function () {
						vectorCoords = vectorCoords;
					}
				},
				"<"
			)
			.to(
				{},
				{
					duration: delay
				}
			);

		// Scale the basis vectors to the transformed vector
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-5",
					end: `+=${scrollUnit * 3}`
				}
			})
			.add("step-1")
			.to(
				props,
				{
					xScalarAlign: "left",
					yScalarAlign: "top"
				},
				"step-1"
			)
			// Animate out Tex
			.to(
				props,
				{
					xTexOpacity: 0,
					onUpdate: function () {
						props = props;
					}
				},
				"step-1"
			)
			.to(
				props,
				{
					yTexOpacity: 0,
					onUpdate: function () {
						props = props;
					}
				},
				"step-1"
			)
			// Scale basis vectors
			.add("step-2")
			.to(
				props,
				{
					duration: 0.2,
					xScalarOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					duration: 0.2,
					yScalarOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to(
				xCoords,
				{
					endArray: [
						0,
						0,
						0,
						egVector[0] * egMatrixX[0],
						egVector[0] * egMatrixX[1],
						0
					],
					onUpdate: function () {
						xCoords = xCoords;
					}
				},
				"step-2"
			)
			.to(
				yCoords,
				{
					endArray: [
						0,
						0,
						0,
						egVector[1] * egMatrixY[0],
						egVector[1] * egMatrixY[1],
						0
					],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					xScalar: egVector[0],
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					yScalar: egVector[1],
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to({}, { duration: delay })
			// Shift y basis vector
			.add("step-3")
			.to(
				props,
				{
					duration: 0.2,
					xScalarOpacity: 0,
					onUpdate: function () {
						props = props;
					}
				},
				"step-3"
			)
			.to(
				props,
				{
					duration: 0.2,
					yScalarOpacity: 0,
					onUpdate: function () {
						props = props;
					}
				},
				"step-3"
			)
			.to(
				yCoords,
				{
					endArray: [
						egVector[0] * egMatrixX[0],
						egVector[0] * egMatrixX[1],
						0,
						...egOutputVector,
						0
					],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"step-3"
			)
			.to({}, { duration: delay });

		// Animate basis vectors back
		gsap
			.timeline({
				scrollTrigger: {
					...stPropsAlt,
					trigger: "#st-5"
				},
				timelinePropsAlt
			})
			.add("step-1")
			// Remove example vector
			.to(
				props,
				{
					duration,
					vectorTexOpacity: 0,
					onUpdate: function () {
						props = props;
					}
				},
				"step-1"
			)
			.to(
				vectorCoords,
				{
					duration,
					endArray: [0, 0, 0, 0, 0, 0],
					onUpdate: function () {
						vectorCoords = vectorCoords;
					}
				},
				"step-1"
			)
			// Animate back x basis
			.to(
				xCoords,
				{
					duration,
					endArray: [0, 0, 0, 1, 0, 0],
					onUpdate: function () {
						xCoords = xCoords;
					}
				},
				"step-1"
			)
			// Animate back y basis
			.to(
				yCoords,
				{
					duration,
					endArray: [0, 0, 0, 0, 1, 0],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"step-1"
			)
			.add("step-2")
			.to(
				props,
				{
					duration,
					xTexOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					duration,
					yTexOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			);

		// Animate in points
		// FIXME: Animate vectors too?
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-6",
					end: `+=${scrollUnit * 1}`,
					onLeaveBack: () => {
						stProps.onLeaveBack();

						$dataToggled = undefined;
						$transformedGridToggled = false;
					}
				}
			})
			.add("step-1")
			// Animate in points
			.to(
				pointsProps,
				{
					t: 1,
					onUpdate: function () {
						pointsProps = pointsProps;
					}
				},
				"step-1"
			)
			// Animate in transformed grid
			.to(
				gridVars,
				{
					transformedFadeDistance: gridProps.fadeDistance,
					onUpdate: function () {
						gridVars = gridVars;
					}
				},
				"step-1"
			);

		// Perform linear transformation
		// TODO: Use afterimage for animation of points?
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-7",
					end: `+=${scrollUnit * 1}`,
					onToggle: (self) => {
						// $dataToggled = self.isActive ? "points" : undefined;
						$dataToggled = "points";
						$transformedGridToggled = true;
					}
				}
			})
			.to(
				{},
				{
					duration: delay
				}
			)
			.add("step-1")
			// Perform linear transformation
			.to(
				$matrixTween,
				{
					progress: 1.0
				},
				"step-1"
			)
			// .fromTo(
			// 	$customMatrix,
			// 	{
			// 		endArray: initMatrix
			// 	},
			// 	{
			// 		endArray: egEndMatrix,
			// 		onUpdate: () => {
			// 			$matrixTransform = $customMatrix;
			// 		},
			// 	},
			// 	"step-1"
			// )
			// .to(
			// 	$customMatrix,
			// 	{
			// 		endArray: egEndMatrix,
			// 		onUpdate: () => {
			// 			$customMatrix = $customMatrix;
			// 		}
			// 	},
			// 	"step-1"
			// )
			// Animate to new basis vectors
			.to(
				xCoords,
				{
					endArray: [0, 0, 0, ...egMatrixX, 0],
					onUpdate: function () {
						xCoords = xCoords;
					}
				},
				"step-1"
			)
			.to(
				yCoords,
				{
					endArray: [0, 0, 0, ...egMatrixY, 0],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"step-1"
			)
			.to(
				{},
				{
					duration: delay
				}
			);

		// Let users do some input!
		gsap
			.timeline({
				scrollTrigger: {
					...stPropsAlt,
					trigger: "#st-8",
					start: "top center",
					onEnter: () => {
						$showPlayground = true;

						$inputVectorToggled = true;
					},
					onLeaveBack: () => {
						// When going back from playground to interactive

						$showPlayground = false;

						$cameraControls.reset(true);

						// FIXME: Cache settings!
						// Reset input settings
						$dataToggled = "points";
						$gridToggled = true;
						$transformedGridToggled = true;
						$inputVectorToggled = false;

						// Reset playhead
						$matrixTween.progress(1);

						// Reset matrix transform
						gsap.to($endMatrix, {
							endArray: egEndMatrix,
							onUpdate: () => {
								$endMatrix = $endMatrix;
							},
							duration
						});
					}
				},
				timelinePropsAlt
			})
			.add("step-1")
			// Make canvas interactable
			.to(
				"#canvas-wrapper",
				{
					pointerEvents: "auto",
					// cursor: "move",
					duration
				},
				"step-1"
			)
			// Show input
			.from(
				"#inputs",
				{
					autoAlpha: 0,
					x: -40,
					duration
				},
				"step-1"
			)
			// Animate basis vectors to interactive position
			.fromTo(
				xCoords,
				{
					endArray: [0, 0, 0, ...egMatrixX, 0]
				},
				{
					endArray: () => [0, 0, 0, matrix[0], matrix[4], 0],
					onUpdate: () => {
						xCoords = xCoords;
					},
					immediateRender: false,
					duration
				},
				"step-1"
			)
			.fromTo(
				yCoords,
				{
					endArray: [0, 0, 0, ...egMatrixY, 0]
				},
				{
					endArray: () => [0, 0, 0, matrix[1], matrix[5], 0],
					onUpdate: () => {
						yCoords = yCoords;
					},
					immediateRender: false,
					duration
				},
				"step-1"
			)
			// Hide basis vectors
			// FIXME: Animate opacity of vectors
			.to(
				props,
				{
					duration,
					xTexOpacity: 0,
					yTexOpacity: 0,
					// xVisible: false,
					// yVisible: false,
					onUpdate: function () {
						props = props;
					}
				},
				"step-1"
			)
			// Show alt basis vectors
			.to(
				basisAltProps,
				{
					duration: 0.001,
					xVisible: true,
					yVisible: true,
					onUpdate: function () {
						basisAltProps = basisAltProps;
					}
				},
				"step-1"
			)
			.to(
				props,
				{
					duration: 0.001,
					xVisible: false,
					yVisible: false,
					onUpdate: function () {
						props = props;
					}
				},
				"step-1"
			)
			// Show example vector

			.add("step-2");

		// Animate back
		gsap
			.timeline({
				scrollTrigger: {
					...stPropsAlt,
					trigger: "#section-2",
					start: "top center",
					// FIXME:
					// onToggle: () => {
					onEnter: () => {
						// stProps.onEnter();

						$showPlayground = false;

						// Return to default camera position
						$cameraControls.reset(true);

						// Reset input settings
						// cachePlaygroundSettings.dataToggled = $dataToggled;
						$dataToggled = undefined;
						$gridToggled = true;
						$transformedGridToggled = false;
						$inputVectorToggled = false;

						// Reset playhead
						$matrixTween.progress(1);

						// Reset matrix transform
						gsap.to($endMatrix, {
							endArray: initMatrix,
							onUpdate: () => {
								$endMatrix = $endMatrix;
							},
							duration
						});
					},
					onLeaveBack: () => {
						// stProps.onLeaveBack();

						$showPlayground = true;

						// $dataToggled = cachePlaygroundSettings.dataToggled;
					}
				},
				timelinePropsAlt
			})
			.add("step-1")
			// Change grid settings
			.to(
				gridVars,
				{
					duration,
					fadeDistance: grid3dProps.fadeDistance,
					onUpdate: () => {
						gridVars = gridVars;
					}
				},
				"step-1"
			)
			// Disable inputs
			.to(
				"#canvas-wrapper",
				{
					pointerEvents: "none",
					duration
				},
				"step-1"
			)
			.to(
				"#inputs",
				{
					autoAlpha: 0,
					x: -40,
					duration
				},
				"step-1"
			)
			// Reset basis vectors
			.to(
				xCoords,
				{
					endArray: () => [0, 0, 0, 1, 0, 0],
					onUpdate: () => {
						xCoords = xCoords;
					},
					duration: 0.001
				},
				"step-1"
			)
			.to(
				yCoords,
				{
					endArray: () => [0, 0, 0, 0, 1, 0],
					onUpdate: () => {
						yCoords = yCoords;
					},
					duration: 0.001
				},
				"step-1"
			)
			.add("step-2")
			.to(
				basisAltProps,
				{
					duration: 0.001,
					xVisible: false,
					yVisible: false,
					onUpdate: function () {
						basisAltProps = basisAltProps;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					duration: 0.001,
					xVisible: true,
					yVisible: true,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			);

		// Show third dimension
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-9",
					end: `+=${scrollUnit * 3}`,
					onEnter: () => {
						stProps.onEnter();

						$show3d = true;
						basisAltProps.zVisible = false;

						// // Update matrix transform
						// gsap.to($endMatrix, {
						// 	endArray: eg3dMatrix,
						// 	onUpdate: () => {
						// 		$endMatrix = $endMatrix;
						// 	},
						// 	duration
						// });

						basisAltProps.vectorVisible = false;

						$inputVectorToggled = true;

						$vectorCoordsInput[0] = eg3dVector[0];
						$vectorCoordsInput[1] = eg3dVector[1];
						$vectorCoordsInput[2] = eg3dVector[2];
					},
					onLeaveBack: () => {
						stProps.onLeaveBack();

						$show3d = false;
						$grid3dToggled = false;

						// basisAltProps.vectorVisible = true;

						// $vectorCoordsInput = egVector;
            console.log(egVector)
						$vectorCoordsInput[0] = egVector[0];
						$vectorCoordsInput[1] = egVector[1];
						$vectorCoordsInput[2] = 0;

						$inputVectorToggled = false;

						// // Reset matrix transform
						// gsap.to($endMatrix, {
						// 	endArray: initMatrix,
						// 	onUpdate: () => {
						// 		$endMatrix = $endMatrix;
						// 	},
						// 	duration
						// });
					},
					onLeave: () => {
						stProps.onLeave();

						$cameraAutoRotate = true;
						$grid3dToggled = true;
					},
					onEnterBack: () => {
						stProps.onEnterBack();

						$cameraAutoRotate = false;
						gsap.to($cameraControls, {
							azimuthAngle: Math.PI * 0.3
						});
					}
				}
			})
			.add("step-0")
			.to(
				$cameraControls.mouseButtons,
				{
					right: CameraControls.ACTION.ROTATE,
					duration: 0.001
				},
				"step-0"
			)
			// Update matrix
			.to(
				{},
				{
					duration: delay
				},
				"step-0"
			)
			.add("step-1")
			// Change camera position
			.to(
				$cameraControls,
				{
					// distance: 8.5,
					distance: 15,
					polarAngle: Math.PI * 0.35,
					// azimuthAngle: `+=${Math.PI * 0.3}`
					azimuthAngle: Math.PI * 0.3
				},
				"step-1"
			)
			// Animate in z basis
			.to(
				zCoords,
				{
					endArray: [0, 0, 0, 0, 0, 1],
					onUpdate: function () {
						zCoords = zCoords;
					}
				},
				"step-1"
			)
			.to(
				props,
				{
					xTexOpacity: 1,
					yTexOpacity: 1,
					xDim3: true,
					yDim3: true,
					zDim3: true,
					vectorDim3: true,
					onUpdate: function () {
						props = props;
					}
				},
				"step-1"
			)
			// Animate in example vector
			.to(
				vectorCoords,
				{
					endArray: [0, 0, 0, ...eg3dVector],
					onUpdate: function () {
						vectorCoords = vectorCoords;
					}
				},
				"step-1"
			)
			// .to(
			// 	$vectorCoordsInput,
			// 	{
			// 		endArray: eg3dVector,
			// 		onUpdate: function () {
			// 			$vectorCoordsInput = $vectorCoordsInput;
			// 		}
			// 	},
			// 	"step-1"
			// )
			.add("step-2")
			.to(
				$matrixTween,
				{
					progress: 0,
					duration: 0.001
				},
				"step-2"
			)
			.to(
				$endMatrix,
				{
					endArray: eg3dMatrix,
					duration: 0.001,
					onUpdate: function () {
						$endMatrix = $endMatrix;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					zTexOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			.to(
				props,
				{
					vectorTexOpacity: 1,
					onUpdate: function () {
						props = props;
					}
				},
				"step-2"
			)
			// Animate in 3d grid
			.to(
				grid3dProps,
				{
					cellThickness: defaultGridProps.cellThickness,
					sectionThickness: defaultGridProps.sectionThickness,
					onUpdate: function () {
						grid3dProps = grid3dProps;
					}
				},
				"step-2"
			)
			.add("step-3")
			.to(
				grid3dProps,
				{
					t: 1,
					onUpdate: function () {
						grid3dProps = grid3dProps;
					}
				},
				"step-3"
			)
			.to(
				{},
				{
					duration: delay
				}
			);

		// Perform linear transformation; in 3D!
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-10",
					end: `+=${scrollUnit * 1}`
				}
			})
			.add("step-1")
			.to(
				$matrixTween,
				{
					progress: 1.0
				},
				"step-1"
			)
			// Animate to new basis vectors
			.to(
				xCoords,
				{
					endArray: [0, 0, 0, ...eg3dMatrixX],
					onUpdate: function () {
						xCoords = xCoords;
					}
				},
				"step-1"
			)
			.to(
				yCoords,
				{
					endArray: [0, 0, 0, ...eg3dMatrixY],
					onUpdate: function () {
						yCoords = yCoords;
					}
				},
				"step-1"
			)
			.to(
				zCoords,
				{
					endArray: [0, 0, 0, ...eg3dMatrixZ],
					onUpdate: function () {
						zCoords = zCoords;
					}
				},
				"step-1"
			)
			// Animate output vector
			.to(
				vectorCoords,
				{
					endArray: [0, 0, 0, ...eg3dOutputVector],
					onUpdate: function () {
						vectorCoords = vectorCoords;
					}
				},
				"step-1"
			)
			.to(
				{},
				{
					duration: delay
				}
			);

		// TODO: What is the best way to show transformations of space in 3D?
		// FIXME: Do we need this animation again?
		// Show linear combination;  Scale the basis vectors to the transformed vector
		// gsap
		// 	.timeline({
		// 		...timelineProps,
		// 		scrollTrigger: {
		// 			...stProps,
		// 			trigger: "#st-11",
		// 			end: `+=${scrollUnit * 3}`
		// 		}
		// 	})
		// 	.add("step-1")
		// 	// Animate out Tex
		// 	.to(
		// 		props,
		// 		{
		// 			xTexOpacity: 0,
		// 			yTexOpacity: 0,
		// 			zTexOpacity: 0,
		// 			onUpdate: function () {
		// 				props = props;
		// 			}
		// 		},
		// 		"step-1"
		// 	)
		// 	.add("step-2")
		// 	// Show scalars
		// 	.to(
		// 		props,
		// 		{
		// 			duration: 0.2,
		// 			xScalarOpacity: 1,
		// 			yScalarOpacity: 1,
		// 			zScalarOpacity: 1,
		// 			onUpdate: function () {
		// 				props = props;
		// 			}
		// 		},
		// 		"step-2"
		// 	)
		// 	// Scale basis vectors
		// 	.to(
		// 		xCoords,
		// 		{
		// 			endArray: [
		// 				0,
		// 				0,
		// 				0,
		// 				eg3dVector[0] * eg3dMatrixX[0],
		// 				eg3dVector[0] * eg3dMatrixX[1],
		// 				eg3dVector[0] * eg3dMatrixX[2]
		// 			],
		// 			onUpdate: function () {
		// 				xCoords = xCoords;
		// 			}
		// 		},
		// 		"step-2"
		// 	)
		// 	.to(
		// 		yCoords,
		// 		{
		// 			endArray: [
		// 				0,
		// 				0,
		// 				0,
		// 				eg3dVector[1] * eg3dMatrixY[0],
		// 				eg3dVector[1] * eg3dMatrixY[1],
		// 				eg3dVector[1] * eg3dMatrixY[2]
		// 			],
		// 			onUpdate: function () {
		// 				yCoords = yCoords;
		// 			}
		// 		},
		// 		"step-2"
		// 	)
		// 	.to(
		// 		zCoords,
		// 		{
		// 			endArray: [
		// 				0,
		// 				0,
		// 				0,
		// 				eg3dVector[2] * eg3dMatrixZ[0],
		// 				eg3dVector[2] * eg3dMatrixZ[1],
		// 				eg3dVector[2] * eg3dMatrixZ[2]
		// 			],
		// 			onUpdate: function () {
		// 				zCoords = zCoords;
		// 			}
		// 		},
		// 		"step-2"
		// 	)
		// 	// Animate scalar text too
		// 	.to(
		// 		props,
		// 		{
		// 			xScalar: eg3dVector[0],
		// 			yScalar: eg3dVector[1],
		// 			zScalar: eg3dVector[2],
		// 			onUpdate: function () {
		// 				props = props;
		// 			}
		// 		},
		// 		"step-2"
		// 	)
		// 	.to({}, { duration: delay });

		// Show playground
		const playgroundTl = gsap
			.timeline({
				scrollTrigger: {
					...stPropsAlt,
					trigger: "#st-12",
					start: "top center",
					onEnter: () => {
						$cameraAutoRotate = false;

						$showPlayground = true;

						basisAltProps.vectorVisible = true;
						props.vectorVisible = true;
					},
					onLeaveBack: () => {
						$cameraAutoRotate = true;

						$showPlayground = false;

						// Reset
						$dataToggled = undefined;
						$gridToggled = true;
						$transformedGridToggled = false;

						// Reset playhead
						$matrixTween.progress(1);

						// Reset matrix transform
						gsap.to($endMatrix, {
							endArray: eg3dMatrix,
							onUpdate: () => {
								$endMatrix = $endMatrix;
							},
							duration
						});

						basisAltProps.vectorVisible = false;
						props.vectorVisible = false;
					}
				},
				timelinePropsAlt
			})
			.add("step-1")
			// Make canvas interactable
			.to(
				"#canvas-wrapper",
				{
					pointerEvents: "auto",
					// cursor: "move",
					duration
				},
				"step-1"
			)
			// Show input
			.to(
				"#inputs",
				{
					autoAlpha: 1,
					x: 0,
					duration
				},
				"step-1"
			)
			// Hide basis vectors
			.to(
				props,
				{
					duration,
					xTexOpacity: 0,
					yTexOpacity: 0,
					zTexOpacity: 0,
					vectorTexOpacity: 0,
					xVisible: false,
					yVisible: false,
					zVisible: false,
					onUpdate: function () {
						props = props;
					}
				},
				"step-1"
			)
			// Show alt basis vectors
			.to(
				basisAltProps,
				{
					duration,
					xVisible: true,
					yVisible: true,
					zVisible: true,
					onUpdate: function () {
						basisAltProps = basisAltProps;
					}
				},
				"step-1"
			);

		$playgroundSt = playgroundTl.scrollTrigger;
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
	$: if (!$debug && mounted && $titleMounted && $sceneMounted) animate();

	// $: if (loaded && $titleMounted && $sceneMounted) animate();
	// $: if (loaded) animate();

	onMount(() => {
		mounted = true;
	});
</script>

{#if $showHero}
	<Hero />
{/if}

<!-- TODO: Shadows? -->

<!-- TODO: Add sky? -->
<!-- <Sky /> -->

<!-- Peripherals -->
<!-- <Grid {view} {dim} opacity={0.2} {gridColor} {axisColor} />
<Grid view={transformedView} {dim} {gridColor} {axisColor} /> -->

<!-- Example vector -->
<Vector
	{view}
	coords={vectorCoords}
	color={colorVector}
	texOpacity={props.vectorTexOpacity}
	visible={props.xVisible}
	dim3={props.vectorDim3}
/>

<!-- Example vector that animates on input -->
<Vector
	view={transformedView}
	coords={[0, 0, 0, ...$vectorCoordsSpring]}
	color={colorVector}
	tex={false}
	visible={basisAltProps.vectorVisible}
/>

<!-- Basis vectors -->
<Vector
	{view}
	coords={xCoords}
	color={colorX}
	texOpacity={props.xTexOpacity}
	scalar={props.xScalar}
	scalarOpacity={props.xScalarOpacity}
	scalarAlign={props.xScalarAlign}
	visible={props.xVisible}
	dim3={props.xDim3}
/>
<Vector
	{view}
	coords={yCoords}
	color={colorY}
	texOpacity={props.yTexOpacity}
	scalar={props.yScalar}
	scalarOpacity={props.yScalarOpacity}
	scalarAlign={props.yScalarAlign}
	visible={props.yVisible}
	dim3={props.yDim3}
/>
<Vector
	{view}
	coords={zCoords}
	color={colorZ}
	texOpacity={props.zTexOpacity}
	scalar={props.zScalar}
	scalarOpacity={props.zScalarOpacity}
	scalarAlign={props.zScalarAlign}
	visible={props.zVisible}
	dim3={props.zDim3}
/>

<!-- Basis vectors (that animate on input) -->
<Vector
	view={transformedView}
	coords={[0, 0, 0, 1, 0, 0]}
	color={colorX}
	tex={false}
	visible={basisAltProps.xVisible}
/>
<Vector
	view={transformedView}
	coords={[0, 0, 0, 0, 1, 0]}
	color={colorY}
	tex={false}
	visible={basisAltProps.yVisible}
/>
<Vector
	view={transformedView}
	coords={[0, 0, 0, 0, 0, 1]}
	color={colorZ}
	tex={false}
	visible={basisAltProps.zVisible}
/>

<!-- FIXME: Change blending mode of grid? -->
<T.Group renderOrder={-3}>
	<Grid {...gridProps} axes={"xyz"} />
</T.Group>

<!-- Transformed elements -->
<!-- TODO: Overlay another grid in the hero for a cool effect? -->
<T.Group renderOrder={-2} matrix={$matrixTransform} matrixAutoUpdate={false}>
	<!-- Grids -->
	<!-- FIXME: Don't do infinite grid? A bit confusing -->

	<Grid {...transformedGridProps} axes={"xyz"} />
</T.Group>

<T.Group renderOrder={-4} matrix={$matrixTransform} matrixAutoUpdate={false}>
	<!-- 3d grid -->
	<Grid
		axes={"xzy"}
		position.z={gridSectionSize * 0}
		position.y={gridSectionSize}
		{...grid3dProps}
	/>
	<Grid
		axes={"zyx"}
		position.z={gridSectionSize * 0}
		position.x={-gridSectionSize}
		{...grid3dProps}
	/>
</T.Group>

<!-- Maxwell the carryable cat -->
<T.Group renderOrder={-4} matrix={$matrixTransform} matrixAutoUpdate={false}>
	{#await useGltf("/maxwell.glb") then model}
		<T
			is={model.scene}
			position.z={0}
			rotation={[Math.PI / 2, 0, 0]}
			{...modelProps}
		/>
	{/await}

	<T.Mesh {...imageProps}>
		<T.PlaneGeometry args={[6, 6]} />
		<!-- {#await useTexture("/maxwell.jpg") then texture}
			<T.MeshBasicMaterial map={texture}>
				<T.DoubleSide attach="side" />
			</T.MeshBasicMaterial>
		{/await} -->
		{#await map then value}
			<T.MeshBasicMaterial map={value}>
				<T.DoubleSide attach="side" />
			</T.MeshBasicMaterial>
		{/await}
	</T.Mesh>
</T.Group>

<!-- Add a plane -->
<!-- <T.Mesh position.z={-0.02}>
	<T.PlaneGeometry args={[40, 40]} />
	<T.MeshStandardMaterial
		color={new Color("hsl(231, 15%, 18%)")}
		opacity={0.8}
		transparent={true}
	>
		<T.DoubleSide attach="side" />
	</T.MeshStandardMaterial>
</T.Mesh> -->

<!-- TODO: Remove objects that are not visible? -->
<!-- Data -->
<Planes view={transformedView} t={planesProps.t} />
<Points view={transformedView} t={pointsProps.t} />
<Planes view={transformedView} t={planes3dProps.t} dim3 />
<Points view={transformedView} t={points3dProps.t} dim3 />
<!-- <Sphere view={transformedView} /> -->
<!-- <Circle view={transformedView} /> -->

<!-- <Plane
	view={transformedView}
	dim={planeDim}
	position={[-planeDim / 2 - 0.5, -planeDim / 2, -planeDim / 2]}
	rotation={[0, -Math.PI / 2, 0]}
	t={grid3dProps.t}
/>
<Plane
	view={transformedView}
	dim={planeDim}
	position={[-planeDim / 2, planeDim / 2 + 0.5, planeDim / 2]}
	rotation={[-Math.PI / 2, 0, 0]}
	t={grid3dProps.t}
/> -->
<Plane
	view={transformedView}
	dim={planeDim}
	position={[-planeDim / 2, -planeDim / 2, -planeDim / 2]}
	rotation={[0, -Math.PI / 2, 0]}
	t={grid3dProps.t}
/>
<Plane
	view={transformedView}
	dim={planeDim}
	position={[-planeDim / 2, planeDim / 2, planeDim / 2]}
	rotation={[-Math.PI / 2, 0, 0]}
	t={grid3dProps.t}
/>

<!-- FIXME: Has weird artifacts for some reason? -->
<!-- <Gridlines view={transformedView} t={grid3dProps.t} /> -->
