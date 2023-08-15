<script>
	import { useThrelte } from "@threlte/core";
	import { Vector3 } from "three";
	import { heroMatrix } from "$stores";
	import { spring } from "svelte/motion";

	// Input is simply position of user's mouse?
	// To change:
	// - Basis vectors
	//   - One is random, one is determined by user input
	// - Some colors

	const { camera } = useThrelte();

	const xBasis = new Vector3(1, 0, 0);
  // FIXME: Does this have to be a spring too?
  const xBasisSpring = spring([1, 0, 0])
  // xBasisSpring.stiffness = 0.1
  xBasisSpring.damping = 1.5

	let width;
	let height;

  // TODO: Animate the other basis vector by some random process
  // TODO: Make the hero 3d?

  $: onChange($xBasisSpring)
  function onChange(xBasis) {
    $heroMatrix = [
      xBasis[0], 0, 0, 0,
      xBasis[1], 1, 0, 0,
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
		// vector.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1, 0);
		// xBasis.set(((e.clientX / width) * 2 - 1) * width, (-(e.clientY / height) * 2 + 1) * height, 0);
    // FIXME:
		xBasis.set(((e.clientX / width) * 2 - 1) * 1, (-(e.clientY / height) * 2 + 1) * 1, 0);

		xBasis.unproject($camera);

    $xBasisSpring = [xBasis.x, xBasis.y, xBasis.z]
	}}
/>
