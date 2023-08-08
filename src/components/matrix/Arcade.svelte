<script>
	// import Grid from "./Grid.svelte";
	import { Grid } from "@threlte/extras";
	import { useTweakpane } from "$utils/useTweakpane";
	import { T, useThrelte } from "@threlte/core";
	import Points from "./Points.svelte";
	import Sphere from "./Sphere.svelte";
	import Circle from "./Circle.svelte";
	import Planes from "./Planes.svelte";
	import {
		endMatrix,
		playhead,
		playToggle,
		matrixTween,
		gridToggled,
		transformedGridToggled,
		dataToggled,
		showHero,
		heroMatrix,
		afterImageEnabled,
		cameraAutoRotate,
		show3d,
		showPlayground,
		customMatrix
	} from "$stores";
	import Vector from "./Vector.svelte";
	import { ScrollTrigger, gsap } from "$utils/gsap.js";
	import { onMount } from "svelte";
	import {
		sceneMounted,
		titleMounted,
		loaded,
		cameraProps,
		cameraControls
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
		initMatrix
	} from "$data/variables";
	import colors from "tailwindcss/colors";
	import CameraControls from "camera-controls";
	import { Color, MeshBasicMaterial, PlaneGeometry } from "three";
	import Hero from "./Hero.svelte";
	import { spring } from "svelte/motion";

	export let mathbox;

	let mounted;

	// Set this to the z-position of the camera
	mathbox.set("focus", 15);

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
	$matrixTween.progress(1);

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
		} else if (!$showPlayground) {
			$matrixTransform = $customMatrix;
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

	const gridProps = {
		cellSize: gridCellSize,
		// cellColor: colors.slate["800"],
		cellColor: colors.slate["600"],
		cellThickness: 1.5,
		sectionSize: gridSectionSize,
		// sectionColor: colors.slate["800"],
		sectionColor: colors.slate["600"],
		sectionThickness: 3,
		infiniteGrid: true,
		fadeDistance: 30,
		fadeStrength: 4
	};

	let gridVars = {
		fadeDistance: gridProps.fadeDistance,
		transformedFadeDistance: gridProps.fadeDistance
	};

	const altFadeDistance = 20;

	$: onGridToggle($gridToggled);
	function onGridToggle(toggled) {
		if (toggled) {
			gsap.to(gridVars, {
				fadeDistance: gridProps.fadeDistance,
				onUpdate: function () {
					gridVars = gridVars;
				}
			});
		} else {
			gsap.to(gridVars, {
				fadeDistance: 0,
				onUpdate: function () {
					gridVars = gridVars;
				}
			});
		}
	}

	$: onTransformedGridToggle($transformedGridToggled);
	function onTransformedGridToggle(toggled) {
		if (toggled) {
			gsap.to(gridVars, {
				transformedFadeDistance: gridProps.fadeDistance,
				onUpdate: function () {
					gridVars = gridVars;
				}
			});
		} else {
			gsap.to(gridVars, {
				transformedFadeDistance: 0,
				onUpdate: function () {
					gridVars = gridVars;
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
		}

		// Update prev value
		prevDataToggled = toggled;
	}

	// ScrollTrigger
	const delay = 0.1;
	const transitionDuration = 0.1;

	let vectorCoords = [0, 0, 0, 0, 0, 0];
	let xCoords = [0, 0, 0, 0, 0, 0];
	let yCoords = [0, 0, 0, 0, 0, 0];
	let zCoords = [0, 0, 0, 0, 0, 0];

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

	let basisAltProps = {
		xVisible: false,
		yVisible: false,
		zVisible: false
	};

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
					end: `+=${scrollUnit * 1}`
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
		// TODO: Keep the example vector?
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-6",
					end: `+=${scrollUnit * 1}`
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
			.to(
				{},
				{
					duration: delay
				}
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
						$dataToggled = self.isActive ? "points" : undefined;
						$dataToggled = "points";
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
			// .to(
			// 	$matrixTween,
			// 	{
			// 		progress: 1.0
			// 	},
			// 	"step-1"
			// )
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
			.to(
				$customMatrix,
				{
					endArray: egEndMatrix,
					onUpdate: () => {
						$customMatrix = $customMatrix;
					}
				},
				"step-1"
			)
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

						// Reset playhead
						$matrixTween.progress(1);
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
					cursor: "move",
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
			.add("step-2");
		// Shift back basis vectors
		// .to(
		// 	xCoords,
		// 	{
		// 		duration: 0.001,
		// 		endArray: [0, 0, 0, 1, 0, 0],
		// 		onUpdate: function () {
		// 			xCoords = xCoords;
		// 		}
		// 	},
		// 	"step-2"
		// )
		// .to(
		// 	yCoords,
		// 	{
		// 		duration: 0.001,
		// 		endArray: [0, 0, 0, 0, 1, 0],
		// 		onUpdate: function () {
		// 			yCoords = yCoords;
		// 		}
		// 	},
		// 	"step-2"
		// );

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
						stProps.onEnter();

						$showPlayground = false;

						// Return to default camera position
						$cameraControls.reset(true);

						// Reset input settings
						// cachePlaygroundSettings.dataToggled = $dataToggled;
						$dataToggled = undefined;
						$gridToggled = true;
						$transformedGridToggled = true;

						// Reset playhead
						$matrixTween.progress(1);

						// Reset matrix transform
						// $customMatrix = initMatrix;
					},
					onLeaveBack: () => {
						stProps.onLeaveBack();

						$showPlayground = true;

						// $dataToggled = cachePlaygroundSettings.dataToggled;
					}
				},
				timelinePropsAlt
			})
			.add("step-1")
			// Reset matrix transform
			.to(
				$customMatrix,
				{
					endArray: initMatrix,
					onUpdate: () => {
						$customMatrix = $customMatrix;
					},
					duration: 0.001
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
				"step-1"
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
				"step-1"
			)
			// Reset basis vectors
			.fromTo(
				xCoords,
				{
					endArray: () => [0, 0, 0, matrix[0], matrix[4], 0]
				},
				{
					endArray: () => [0, 0, 0, 1, 0, 0],
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
					endArray: () => [0, 0, 0, matrix[1], matrix[5], 0]
				},
				{
					endArray: () => [0, 0, 0, 0, 1, 0],
					onUpdate: () => {
						yCoords = yCoords;
					},
					immediateRender: false,
					duration
				},
				"step-1"
			)
			.add("step-2");

		// Show third dimension
		gsap
			.timeline({
				...timelineProps,
				scrollTrigger: {
					...stProps,
					trigger: "#st-9",
					end: `+=${scrollUnit * 2}`,
					onEnter: () => {
						stProps.onEnter();

						$show3d = true;
					},
					onLeaveBack: () => {
						stProps.onLeaveBack();

						$show3d = false;
					},
					onLeave: () => {
						stProps.onLeave();

						$cameraAutoRotate = true;
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
				$endMatrix,
				{
					endArray: eg3dMatrix,
					duration: 0.001,
					onUpdate: function () {
						$endMatrix = $endMatrix;
					}
				},
				"step-0"
			)
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
					distance: 8.5,
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
			.add("step-2")
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
			);

		// TODO: Auto-rotate?
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
		gsap
			.timeline({
				scrollTrigger: {
					...stPropsAlt,
					trigger: "#st-12",
					start: "top center",
					onEnter: () => {
						console.log("enter");
						$cameraAutoRotate = false;
					},
					onLeaveBack: () => {
						$cameraAutoRotate = true;
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
					cursor: "move",
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
	$: if (mounted && $titleMounted && $sceneMounted) animate();

	// $: if (loaded && $titleMounted && $sceneMounted) animate();
	// $: if (loaded) animate();

	onMount(() => {
		mounted = true;
	});
</script>

{#if $showHero}
	<Hero />
{/if}

<!-- Peripherals -->
<!-- <Grid {view} {dim} opacity={0.2} {gridColor} {axisColor} />
<Grid view={transformedView} {dim} {gridColor} {axisColor} /> -->

<!-- Example vector -->
<Vector
	{view}
	coords={vectorCoords}
	color={colorVector}
	texOpacity={props.vectorTexOpacity}
	dim3={props.vectorDim3}
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

<T.Group position.z={-0.01}>
	<Grid
		axes={"xyz"}
		{...gridProps}
		cellColor={colors.slate["700"]}
		sectionColor={colors.slate["700"]}
		fadeDistance={gridVars.fadeDistance}
	/>
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

<!-- Transformed elements -->
<T.Group matrix={$matrixTransform} matrixAutoUpdate={false}>
	<!-- Grids -->
	<!-- FIXME: Don't do infinite grid? A bit confusing -->
	<!-- FIXME: Have a cool gradient environment / background -->
	<Grid
		axes={"xyz"}
		{...gridProps}
		fadeDistance={gridVars.transformedFadeDistance}
	/>
	<!-- <Grid
		position.z={gridSectionSize * 0}
		position.y={gridSectionSize}
		axes={"xzy"}
		{...gridProps}
		fadeDistance={altFadeDistance}
		visible={true}
	/>
	<Grid
		position.z={gridSectionSize * 0}
		position.x={-gridSectionSize}
		axes={"zyx"}
		{...gridProps}
		fadeDistance={altFadeDistance}
		visible={true}
	/> -->
</T.Group>

<!-- TODO: Remove objects that are not visible? -->
<!-- Data -->
<Planes view={transformedView} t={planesProps.t} />
<Points view={transformedView} t={pointsProps.t} />
<Planes view={transformedView} t={planes3dProps.t} dim3 />
<Points view={transformedView} t={points3dProps.t} dim3 />
<!-- <Sphere view={transformedView} /> -->
<!-- <Circle view={transformedView} /> -->
