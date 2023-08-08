import { writable } from "svelte/store";
import { egMatrixX, egMatrixY } from "$data/variables";
import { spring } from "svelte/motion";

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

export const heroMatrix = writable([
	1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
]);

export const gridToggled = writable(true);
// export const gridToggled = writable(false)
export const transformedGridToggled = writable(true);
export const dataToggled = writable(undefined);

export const showHero = writable(true);
export const show3d = writable(false);

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
// export const playhead = writable(1);
export const playToggle = writable(true);

export const titleMounted = writable(false);
export const sceneMounted = writable(false);

export const loaded = writable(false);

export const afterImageEnabled = writable(true);
export const cameraAutoRotate = writable(false);
