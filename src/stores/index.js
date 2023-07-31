import { writable } from "svelte/store";

export const endMatrix = writable([
	1, 1, -1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1
]);

export const matrixTween = writable(undefined);

// ScrubberInput stores
export const playhead = writable(0);
export const playToggle = writable(true)

export const titleMounted = writable(false)
export const sceneMounted = writable(false)

export const loaded = writable(false)
