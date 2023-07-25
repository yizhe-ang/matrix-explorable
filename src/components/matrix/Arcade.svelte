<script>
  import Grid from "./Grid.svelte";

  export let mathbox;

  // Set this to the z-position of the camera
	mathbox.set('focus', 1.2);

  // Set up coordinate system
	const dim = 15;
	const range = [
		[-dim, dim],
		[-dim, dim]
	];
	const view = mathbox.cartesian({
		range
	});
</script>

<Grid {view} {dim} />