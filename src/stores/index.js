import { get, writable } from "svelte/store";
import { egMatrixX, egMatrixY, egVector } from "$data/variables";
import { spring } from "svelte/motion";

export const debug = writable(false);

// export const endMatrix = writable([
// 	1, 1, -1, 0,
//   0, 1, 1, 0,
//   0, 0, 1, 0,
//   0, 0, 0, 1
// ]);
export const endMatrix = writable([
	egMatrixX[0],
	egMatrixY[0],
	0,
	0,
	egMatrixX[1],
	egMatrixY[1],
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
]);
// export const endMatrix = spring([
// 	egMatrixX[0],
// 	egMatrixY[0],
// 	0,
// 	0,
// 	egMatrixX[1],
// 	egMatrixY[1],
// 	0,
// 	0,
// 	0,
// 	0,
// 	1,
// 	0,
// 	0,
// 	0,
// 	0,
// 	1
// ]);

export const vectorCoordsInput = spring([...egVector, 0]);

// Separate matrix transformation states
export const heroMatrix = writable([
	1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
]);

export const customMatrix = writable([
	1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
]);

export const inputVectorToggled = writable(false);
export const gridToggled = writable(false);
export const transformedGridToggled = writable(true);
export const grid3dToggled = writable(false);
export const dataToggled = writable(undefined);

export const showHero = writable(true);
if (get(debug)) showHero.set(false);

export const show3d = writable(false);
if (get(debug)) show3d.set(true);
export const showPlayground = writable(false);
if (get(debug)) showPlayground.set(true);

export const cameraControls = writable(undefined);
export const cameraProps = writable({
	dolly: 30,
	polarAngle: 0,
	truckX: 0,
	truckY: 0
});

export const matrixTween = writable(undefined);

// ScrubberInput stores
export const playhead = writable(0);
export const playToggle = writable(true);

export const titleMounted = writable(false);
export const sceneMounted = writable(false);

export const loaded = writable(false);

export const afterImageEnabled = writable(true);
export const rgbShiftEnabled = writable(true);
if (get(debug)) rgbShiftEnabled.set(false);

export const cameraAutoRotate = writable(false);

export const playgroundSt = writable(undefined);

export const resetViewToggle = writable(true);

export const expandPlayground = writable(false);
if (get(debug)) expandPlayground.set(true);
