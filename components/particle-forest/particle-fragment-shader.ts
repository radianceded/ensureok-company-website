export const particleFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uFogDensity;

  varying float vBrightness;
  varying float vAlpha;
  varying float vInfluence;
  varying float vNearness;
  varying float vDepthLayer;
  varying vec3 vColor;

  void main() {
    vec2 centered = gl_PointCoord - 0.5;
    float radius = length(centered);
    if (radius > 0.5) discard;

    // Tiny points stay crisp; only close surface points receive a soft edge.
    float crispCore = 1.0 - smoothstep(0.12, 0.43, radius);
    float softEdge = 1.0 - smoothstep(0.28, 0.5, radius);
    float shape = mix(crispCore, softEdge, clamp(vNearness * 0.48 + vDepthLayer * 0.1, 0.0, 0.62));

    float depthFade = mix(1.0 - uFogDensity * 1.15, 1.0, vNearness);
    float alpha = shape * vAlpha * uOpacity * max(0.28, depthFade);
    if (alpha < 0.008) discard;

    // Preserve warm shader color and enough alpha to read as a continuous scan surface.
    gl_FragColor = vec4(vColor, min(alpha, 0.84));
  }
`
