export const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uCameraZ;
  uniform vec2 uPointerNdc;
  uniform vec2 uMouseVelocity;
  uniform float uInteractionRadius;
  uniform float uRepulsionStrength;
  uniform float uSwirlStrength;
  uniform float uDepthStrength;
  uniform float uVelocityStrength;
  uniform float uNoiseStrength;
  uniform float uPointerActive;
  uniform float uPointScale;
  uniform float uDensity;
  uniform float uAspect;
  uniform float uVolumeDepth;
  uniform float uAttract;

  attribute vec3 aOriginalPosition;
  attribute vec3 aClusterCenter;
  attribute float aSize;
  attribute float aBrightness;
  attribute float aDepthLayer;
  attribute float aRandom;
  attribute float aClusterId;
  attribute float aMotionPhase;
  attribute float aMotionSpeed;
  attribute float aColorVariation;
  attribute float aAlpha;

  varying float vBrightness;
  varying float vAlpha;
  varying float vInfluence;
  varying float vNearness;
  varying float vDepthLayer;
  varying vec3 vColor;

  float hash31(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float valueNoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash31(i), hash31(i + vec3(1, 0, 0)), f.x), mix(hash31(i + vec3(0, 1, 0)), hash31(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash31(i + vec3(0, 0, 1)), hash31(i + vec3(1, 0, 1)), f.x), mix(hash31(i + vec3(0, 1, 1)), hash31(i + vec3(1, 1, 1)), f.x), f.y),
      f.z
    ) * 2.0 - 1.0;
  }

  vec3 flowingField(vec3 p, float phase) {
    float t = uTime * aMotionSpeed;
    // Three offset low-frequency fields form a calm curl-like flow.
    return vec3(
      valueNoise(p * 0.22 + vec3(t * 0.12, phase, -t * 0.05)),
      valueNoise(p * 0.19 + vec3(-phase, t * 0.1, t * 0.04)),
      valueNoise(p * 0.24 + vec3(t * 0.05, -t * 0.08, phase))
    );
  }

  void main() {
    vec3 resting = aOriginalPosition;
    vec3 clusterCenter = aClusterCenter;
    float clusterPhase = aClusterId * 1.618 + aMotionPhase * 0.08;
    float clusterTime = uTime * (0.19 + fract(aClusterId * 0.173) * 0.17) + clusterPhase;

    // 1–3: local flow plus coherent cluster drift and expansion around the scan position.
    vec3 localFlow = flowingField(resting + aRandom * 4.0, aMotionPhase);
    float nearMotion = mix(0.72, 1.42, aDepthLayer);
    vec3 localOffset = localFlow * vec3(0.145, 0.19, 0.125) * nearMotion;
    localOffset += vec3(
      sin(uTime * aMotionSpeed * 0.72 + aMotionPhase),
      cos(uTime * aMotionSpeed * 0.61 + aMotionPhase * 1.31),
      sin(uTime * aMotionSpeed * 0.53 - aMotionPhase)
    ) * vec3(0.065, 0.082, 0.055) * nearMotion;

    vec3 clusterDirection = normalize(vec3(
      sin(aClusterId * 2.17),
      cos(aClusterId * 1.43) * 0.72,
      sin(aClusterId * 0.91) * 0.65
    ) + vec3(0.001));
    vec3 clusterDrift = clusterDirection * sin(clusterTime) * (0.095 + aDepthLayer * 0.07);
    float breathing = sin(clusterTime * 0.73 + aClusterId) * 0.018;
    vec3 animated = resting + localOffset + clusterDrift + (resting - clusterCenter) * breathing;

    // 5: recycle the 120-unit corridor around the travelling camera.
    float relativeZ = animated.z - uCameraZ;
    relativeZ = mod(relativeZ + uVolumeDepth - 6.0, uVolumeDepth) - uVolumeDepth + 6.0;
    animated.z = uCameraZ + relativeZ;

    // 7: on enter, particles flow toward the logo focal point ahead of the camera.
    vec3 focalPoint = vec3(0.0, 0.35, uCameraZ + 4.0);
    vec3 toFocal = focalPoint - animated;
    float attractStrength = uAttract * (0.35 + aRandom * 0.65);
    animated += toFocal * attractStrength;

    vec4 baseView = modelViewMatrix * vec4(animated, 1.0);
    vec4 baseClip = projectionMatrix * baseView;
    vec2 baseNdc = baseClip.xy / max(baseClip.w, 0.001);
    vec2 aspectDelta = vec2((baseNdc.x - uPointerNdc.x) * uAspect, baseNdc.y - uPointerNdc.y);

    float boundary = valueNoise(animated * 0.38 + aMotionPhase) * 0.055;
    float fieldDistance = length(aspectDelta) + boundary;
    float broad = 1.0 - smoothstep(uInteractionRadius * 0.16, uInteractionRadius, fieldDistance);
    float core = 1.0 - smoothstep(0.0, uInteractionRadius * 0.48, fieldDistance);
    float influence = clamp(broad * 0.74 + core * core * 0.48, 0.0, 1.0) * uPointerActive;

    // 4: magnetic deformation overlays the autonomous motion without hiding points.
    vec2 warpedDelta = aspectDelta + localFlow.xy * (0.045 + aRandom * 0.035);
    vec2 radial = warpedDelta / max(length(warpedDelta), 0.012);
    radial.x /= uAspect;
    vec2 tangent = vec2(-radial.y, radial.x);
    float mouseSpeed = min(length(uMouseVelocity), 2.5);
    vec2 velocityDirection = uMouseVelocity / max(mouseSpeed, 0.001);
    float swirlDirection = sign(sin(aClusterId * 2.31 + aMotionPhase) + dot(velocityDirection, tangent) * 0.9);
    float radialVariation = 0.62 + sin(aMotionPhase * 1.7 + aClusterId) * 0.24;
    vec2 screenOffset = radial * influence * uRepulsionStrength * (0.058 + core * 0.038) * radialVariation;
    screenOffset += tangent * influence * uSwirlStrength * (0.09 + mouseSpeed * 0.07) * swirlDirection;
    screenOffset += velocityDirection * influence * mouseSpeed * uVelocityStrength * 0.075;
    screenOffset += localFlow.xy * influence * uNoiseStrength * 0.065;

    vec3 displacedView = baseView.xyz;
    displacedView.z += influence * uDepthStrength * (1.65 + localFlow.z * 1.1 - mouseSpeed * 0.5);
    vec4 displacedClip = projectionMatrix * vec4(displacedView, 1.0);
    displacedClip.xy += screenOffset * displacedClip.w;
    gl_Position = displacedClip;

    // 6: nearby scans are visibly larger and brighter, strengthening speed parallax.
    float viewDepth = max(0.1, -baseView.z);
    float nearness = 1.0 - smoothstep(2.0, 43.0, viewDepth);
    float extremeNear = 1.0 - smoothstep(0.8, 10.0, viewDepth);
    float perspectiveSize = mix(0.52, 1.02, nearness);
    float densityMask = step(aRandom, uDensity);
    float attractPulse = 1.0 + uAttract * 0.5;
    gl_PointSize = clamp(aSize * uPointScale * perspectiveSize * attractPulse * (1.0 + extremeNear * 0.28 + influence * 0.08), 1.2, 5.0) * densityMask;

    // White particle palette on sage green background.
    vec3 pureWhite = vec3(1.0, 1.0, 1.0);                // #ffffff
    vec3 offWhite = vec3(0.988, 0.980, 0.976);            // #fcfaf9
    vec3 warmWhite = vec3(0.965, 0.953, 0.949);           // #f6f3f2
    vec3 cloudGrey = vec3(0.906, 0.894, 0.890);           // #e7e4e3
    vec3 silverGrey = vec3(0.831, 0.820, 0.816);          // #d4d1d0

    float spatialNoise = valueNoise(resting * 0.065 + vec3(aClusterId * 0.011)) * 0.5 + 0.5;
    float secondaryField = valueNoise(resting * 0.035 + vec3(8.2, -3.7, 5.4)) * 0.5 + 0.5;
    float clusterField = hash31(vec3(floor(aClusterId * 0.25), floor(aClusterId * 0.06), 4.2));
    float colorField = clamp(spatialNoise * 0.48 + secondaryField * 0.34 + clusterField * 0.18, 0.0, 1.0);
    float heightFactor = smoothstep(-6.5, 9.5, resting.y);
    float visibleSurface = smoothstep(0.2, 0.88, nearness);

    // Airy white particles floating on sage green.
    vec3 particleColor = mix(offWhite, warmWhite, smoothstep(0.08, 0.58, colorField));
    particleColor = mix(particleColor, pureWhite, smoothstep(0.38, 0.88, colorField) * (0.62 + visibleSurface * 0.3));

    // Bright white highlights in canopy bands.
    float highlightRegion = smoothstep(0.5, 0.7, secondaryField) * (1.0 - smoothstep(0.82, 0.96, secondaryField));
    highlightRegion *= mix(0.32, 0.82, heightFactor) * (0.42 + clusterField * 0.4);
    particleColor = mix(particleColor, pureWhite, highlightRegion * 0.68);
    float accentRegion = smoothstep(0.67, 0.9, spatialNoise) * smoothstep(0.38, 0.92, heightFactor);
    particleColor = mix(particleColor, cloudGrey, accentRegion * 0.42);

    // Distance haze.
    float distanceHaze = 1.0 - nearness;
    particleColor = mix(particleColor, silverGrey, distanceHaze * 0.18);
    float environmentalLight = mix(0.94, 1.08, clamp(aBrightness * 0.72 + visibleSurface * 0.2, 0.0, 1.0));
    particleColor *= environmentalLight;
    // 白绿分明：约 30% 粒子纯薄荷绿，其余保持纯白（step 硬切换，无渐变）
    vec3 mintGreen = vec3(0.784, 0.902, 0.851);            // #c8e6d9
    float mintAmount = step(0.7, hash31(resting * 1.43 + vec3(aClusterId * 0.61, 3.1, 9.7)));
    particleColor = mix(particleColor, mintGreen, mintAmount);

    vec3 cursorTint = min(particleColor * 1.05 + pureWhite * 0.02, pureWhite);
    particleColor = mix(particleColor, cursorTint, influence * 0.4);
    vColor = clamp(particleColor, silverGrey * 0.78, pureWhite);

    vBrightness = aBrightness + nearness * 0.2;
    vAlpha = aAlpha * mix(0.68, 1.0, nearness) * densityMask;
    vInfluence = influence;
    vNearness = nearness;
    vDepthLayer = aDepthLayer;
  }
`
