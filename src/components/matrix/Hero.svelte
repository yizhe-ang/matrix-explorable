<script>
	import { useThrelte } from "@threlte/core";
	import { Vector3 } from "three";
	import Vector from "./Vector.svelte";
	import { heroMatrix } from "$stores";

	// Input is simply position of user's mouse?
	// To change:
	// - Basis vectors
	//   - One is random, one is determined by user input
	// - Some colors

	const { camera } = useThrelte();

	let vector = new Vector3(1, 0, 0);

	let width;
	let height;

  // TODO: Animate the other basis vector by some random process

  $: onChange(vector)
  function onChange(vector) {
    $heroMatrix = [
      vector.x, 0, 0, 0,
      vector.y, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }
</script>

<svelte:window
	bind:innerWidth={width}
	bind:innerHeight={height}
	on:mousemove={(e) => {
		// Normalize
		vector.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1, 0);

		// TODO: Scale vector
    vector.multiplyScalar(2000)

		vector.unproject($camera);

    vector = vector
	}}
/>
