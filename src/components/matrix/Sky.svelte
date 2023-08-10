<script>
  // https://stackoverflow.com/questions/50226091/how-three-js-uses-the-gradient-color-for-the-background
  // https://threejs.org/examples/#webgl_shaders_sky
  // http://lo-th.github.io/Oimo.js/examples/test_basic.html
	import { T } from "@threlte/core";
	import { Color, ShaderMaterial, SphereGeometry } from "three";
	import { colorB1, colorB2, colorB3, colorN, colorNf } from "$data/variables";

	const skyColor = colorN;
	const groundColor = colorB3;
	// const skySize = 1000000;
	const skySize = 100;

	const vertexShader = /* glsl */ `
    varying vec3 vWorldPosition;

    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
    }
  `;

	const fragmentShader = /* glsl */ `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    varying vec3 vWorldPosition;

    void main() {
      float h = normalize(vWorldPosition).z;
      gl_FragColor = vec4(mix(bottomColor, topColor, max(h, 0.0)), 1.0);
    }
  `;

	const uniforms = {
		topColor: { value: new Color(skyColor) },
		bottomColor: { value: new Color(groundColor) }
	};
</script>

<T.Mesh>
	<T.SphereGeometry args={[skySize, 32, 15]} />
	<T.ShaderMaterial {uniforms} {vertexShader} {fragmentShader}>
		<T.BackSide attach="side" />
	</T.ShaderMaterial>
</T.Mesh>
