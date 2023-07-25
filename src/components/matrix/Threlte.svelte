<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
  import * as THREE from 'three';

  // Make the z-axis the "up/down" axis
  THREE.Object3D.DEFAULT_UP.set(0, 0, 1)
</script>

<Canvas colorManagementEnabled={false} rendererParameters={{ webgl1: true }}>
	<Scene />
</Canvas>
