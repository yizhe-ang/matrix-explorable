<script>
	// https://github.com/unconed/mathbox/blob/master/examples/test/context.html
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import * as MathBox from 'mathbox';
	import { onMount } from 'svelte';
	import Arcade from './Arcade.svelte';

	const { size, scene, camera, renderer } = useThrelte();

	// MathBox context
	const context = new MathBox.Context(renderer, scene, $camera).init();
	const mathbox = context.api;

	useFrame(() => {
		context.frame();
	});

	onMount(() => {
		// FIXME: Set size responsively?
		context.resize({ viewWidth: $size.width, viewHeight: $size.height });
	});
</script>

<!-- Set up camera and lighting -->
<T.PerspectiveCamera makeDefault position={[0, 0, 1.12]} near={0.01}>
  <!-- TODO: Look for better controls? -->
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<!-- TODO: Try post-processing -->

<!-- <Grid
	cellSize={0.5}
	cellColor={'#3f3f46'}
	cellThickness={1.5}
	sectionSize={5}
	sectionColor={'#52525b'}
	sectionThickness={3}
	infiniteGrid
	fadeDistance={50}
	fadeStrength={3}
/> -->

<Arcade {mathbox} />
