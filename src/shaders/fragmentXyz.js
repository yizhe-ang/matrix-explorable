export default /* glsl */ `
  // Enable STPQ mapping
  #define POSITION_STPQ
  vec4 getColor(vec4 rgba, inout vec4 stpq) {
    // Retrieve interpolated XYZ from vertices and use as RGB color.
    // Note: gamma correction is applied with .fragment({ gamma: true }).
    vec3 rgb = stpq.xyz;

    // Add spatial grid
    // vec3 d3 = abs(fract(stpq.xyz * 16.0) - .5);
    // float level = 1.0 - 2.0 * min(d3.x, min(d3.y, d3.z));
    // float grid = clamp(level * 32.0 - 24.0, 0.0, 1.0) * .5 + .5;

    // return vec4(rgb * grid, 1.0);

    return vec4(rgb, 1.0);
  }
`;
