export default /* glsl */ `
  // Enable STPQ mapping
  #define POSITION_STPQ
  void getPosition(inout vec4 xyzw, inout vec4 stpq) {
    // Store XYZ per vertex in STPQ
    stpq = xyzw;
  }
`;
