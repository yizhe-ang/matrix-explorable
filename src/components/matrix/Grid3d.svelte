<script>
	import { T } from "@threlte/core";

  const dim = 10
</script>

<T.Mesh rotation.x={Math.PI / 2} renderOrder={5}>
	<T.PlaneGeometry args={[dim, dim]} />
	<T.MeshStandardMaterial
		color={"hsl(231, 15%, 18%)"}
		opacity={0.8}
		transparent={true}
	>
		<T.DoubleSide attach="side" />
	</T.MeshStandardMaterial>
</T.Mesh>
