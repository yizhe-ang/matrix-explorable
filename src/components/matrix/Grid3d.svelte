<script>
	import { T } from "@threlte/core";

	export let dim = 9.95;

	const renderOrder = undefined;
	const opacity = 0.85;
</script>

<T.Mesh position={[0, 5, 0]} rotation.x={Math.PI / 2} {renderOrder}>
	<T.PlaneGeometry args={[dim, dim]} />
	<T.MeshStandardMaterial
		color={"hsl(231, 15%, 18%)"}
		{opacity}
		transparent={true}
		polygonOffset
		polygonOffsetFactor={0.1}
	>
		<T.DoubleSide attach="side" />
	</T.MeshStandardMaterial>
</T.Mesh>

<T.Mesh position={[-5, 0, 0]} rotation.y={Math.PI / 2} {renderOrder}>
	<T.PlaneGeometry args={[dim, dim]} />
	<T.MeshStandardMaterial
		color={"hsl(231, 15%, 18%)"}
		{opacity}
		transparent={true}
		polygonOffset
		polygonOffsetFactor={0.1}
	>
		<T.DoubleSide attach="side" />
	</T.MeshStandardMaterial>
</T.Mesh>

<!-- <T.Mesh position={[0, 5.01, 0]} rotation.x={Math.PI / 2} {renderOrder}>
	<T.PlaneGeometry args={[dim, dim]} />
	<T.MeshStandardMaterial
		color={"hsl(231, 15%, 18%)"}
		{opacity}
		transparent={true}
	>
		<T.DoubleSide attach="side" />
	</T.MeshStandardMaterial>
</T.Mesh>

<T.Mesh position={[-5.01, 0, 0]} rotation.y={Math.PI / 2} {renderOrder}>
	<T.PlaneGeometry args={[dim, dim]} />
	<T.MeshStandardMaterial
		color={"hsl(231, 15%, 18%)"}
		{opacity}
		transparent={true}
	>
		<T.DoubleSide attach="side" />
	</T.MeshStandardMaterial>
</T.Mesh> -->
