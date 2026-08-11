'use client'

import { useFrame } from '@react-three/fiber'
import { type MutableRefObject, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { ForestTuning } from './particle-forest'
import { createProceduralForest } from './create-procedural-forest'
import { particleFragmentShader } from './particle-fragment-shader'
import { particleVertexShader } from './particle-vertex-shader'

type ForestPointCloudProps = {
  pointCount: number
  pointerNdc: MutableRefObject<THREE.Vector2>
  mouseVelocity: MutableRefObject<THREE.Vector2>
  pointerActive: MutableRefObject<number>
  attract: MutableRefObject<number>
  tuning: ForestTuning
  reducedMotion: boolean
}

export function ForestPointCloud({
  pointCount,
  pointerNdc,
  mouseVelocity,
  pointerActive,
  attract,
  tuning,
  reducedMotion,
}: ForestPointCloudProps) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const attributes = useMemo(() => createProceduralForest(pointCount), [pointCount])

  const geometry = useMemo(() => {
    const next = new THREE.BufferGeometry()
    next.setAttribute('position', new THREE.BufferAttribute(attributes.positions, 3))
    next.setAttribute('aOriginalPosition', new THREE.BufferAttribute(attributes.positions, 3))
    next.setAttribute('aSize', new THREE.BufferAttribute(attributes.sizes, 1))
    next.setAttribute('aBrightness', new THREE.BufferAttribute(attributes.brightness, 1))
    next.setAttribute('aDepthLayer', new THREE.BufferAttribute(attributes.depthLayers, 1))
    next.setAttribute('aRandom', new THREE.BufferAttribute(attributes.randoms, 1))
    next.setAttribute('aClusterId', new THREE.BufferAttribute(attributes.clusterIds, 1))
    next.setAttribute('aClusterCenter', new THREE.BufferAttribute(attributes.clusterCenters, 3))
    next.setAttribute('aMotionPhase', new THREE.BufferAttribute(attributes.motionPhases, 1))
    next.setAttribute('aMotionSpeed', new THREE.BufferAttribute(attributes.motionSpeeds, 1))
    next.setAttribute('aColorVariation', new THREE.BufferAttribute(attributes.colorVariations, 1))
    next.setAttribute('aAlpha', new THREE.BufferAttribute(attributes.alphas, 1))
    next.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -56), 150)
    return next
  }, [attributes])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCameraZ: { value: 3 },
      uPointerNdc: { value: new THREE.Vector2(10, 10) },
      uMouseVelocity: { value: new THREE.Vector2() },
      uInteractionRadius: { value: tuning.interactionRadius },
      uRepulsionStrength: { value: tuning.repulsion },
      uSwirlStrength: { value: tuning.swirl },
      uDepthStrength: { value: tuning.depth },
      uVelocityStrength: { value: tuning.velocity },
      uNoiseStrength: { value: 0.07 },
      uPointerActive: { value: 0 },
      uPointScale: { value: tuning.pointScale },
      uOpacity: { value: tuning.opacity },
      uDensity: { value: tuning.density },
      uFogDensity: { value: tuning.fog },
      uAspect: { value: 1 },
      uVolumeDepth: { value: 120 },
      uAttract: { value: 0 },
    }),
    [],
  )

  useFrame((state) => {
    const shader = material.current
    if (!shader) return
    shader.uniforms.uTime.value = reducedMotion ? 0 : state.clock.elapsedTime
    shader.uniforms.uCameraZ.value = state.camera.position.z
    shader.uniforms.uPointerNdc.value.copy(pointerNdc.current)
    shader.uniforms.uMouseVelocity.value.copy(mouseVelocity.current)
    shader.uniforms.uPointerActive.value = pointerActive.current
    shader.uniforms.uInteractionRadius.value = tuning.interactionRadius
    shader.uniforms.uRepulsionStrength.value = tuning.repulsion
    shader.uniforms.uSwirlStrength.value = tuning.swirl
    shader.uniforms.uDepthStrength.value = tuning.depth
    shader.uniforms.uVelocityStrength.value = tuning.velocity
    shader.uniforms.uPointScale.value = tuning.pointScale
    shader.uniforms.uOpacity.value = tuning.opacity
    shader.uniforms.uDensity.value = tuning.density
    shader.uniforms.uFogDensity.value = tuning.fog
    shader.uniforms.uAspect.value = state.size.width / Math.max(1, state.size.height)
    shader.uniforms.uAttract.value = attract.current
  })

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthTest
        depthWrite={false}
        blending={THREE.NormalBlending}
        toneMapped={false}
      />
    </points>
  )
}
