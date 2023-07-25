<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<Canvas colorManagementEnabled={false} rendererParameters={{ webgl1: true }}>
	<Scene />
</Canvas>
