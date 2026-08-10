'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { type MutableRefObject, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { ForestTuning } from './particle-forest'
import { ForestPointCloud } from './forest-point-cloud'

type ParticleSceneProps = {
  pointCount: number
  reducedMotion: boolean
  tuning: ForestTuning
  attract?: MutableRefObject<{ value: number }>
}

const PATH_LENGTH = 120

export function ParticleScene({ pointCount, reducedMotion, tuning, attract }: ParticleSceneProps) {
  const { camera, gl } = useThree()
  const pointerTarget = useRef(new THREE.Vector2(0, 0))
  const pointerNdc = useRef(new THREE.Vector2(0, 0))
  const previousPointer = useRef(new THREE.Vector2(0, 0))
  const rawVelocity = useRef(new THREE.Vector2())
  const mouseVelocity = useRef(new THREE.Vector2())
  const pointerActive = useRef(0)
  const pointerInside = useRef(false)
  const elapsed = useRef(0)
  const attractValue = useRef(0)
  const cameraPosition = useRef(new THREE.Vector3())
  const cameraTangent = useRef(new THREE.Vector3())
  const cameraTarget = useRef(new THREE.Vector3())

  const cameraPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0.35, 3),
          new THREE.Vector3(0.38, 0.52, -8),
          new THREE.Vector3(-0.42, 0.28, -19),
          new THREE.Vector3(0.54, 0.46, -31),
          new THREE.Vector3(-0.33, 0.62, -43),
          new THREE.Vector3(0.5, 0.34, -55),
          new THREE.Vector3(-0.52, 0.5, -67),
          new THREE.Vector3(0.4, 0.26, -79),
          new THREE.Vector3(-0.38, 0.56, -91),
          new THREE.Vector3(0.46, 0.32, -103),
          new THREE.Vector3(0, 0.35, -117),
        ],
        false,
        'catmullrom',
        0.42,
      ),
    [],
  )

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      pointerTarget.current.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      )
      pointerInside.current =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    }
    const leave = () => {
      pointerInside.current = false
    }
    window.addEventListener('pointermove', updatePointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', updatePointer)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [gl])

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.05)
    elapsed.current += reducedMotion ? 0 : safeDelta

    // GSAP 时间线驱动 attract（0→1 汇聚，穿过文字后 1→0 回归）
    const target = attract?.current.value ?? 0
    attractValue.current = THREE.MathUtils.damp(attractValue.current, target, 2.4, safeDelta)
    const speedBoost = 1 + attractValue.current * 2.2
    const travelDistance = elapsed.current * tuning.cameraSpeed * speedBoost
    const progress = reducedMotion ? 0 : (travelDistance % PATH_LENGTH) / PATH_LENGTH

    cameraPath.getPointAt(progress, cameraPosition.current)
    cameraPath.getTangentAt(progress, cameraTangent.current)
    camera.position.copy(cameraPosition.current)
    cameraTarget.current.copy(cameraPosition.current).addScaledVector(cameraTangent.current, 11)
    cameraTarget.current.y += Math.sin(elapsed.current * 0.22) * 0.08
    camera.lookAt(cameraTarget.current)
    camera.updateMatrixWorld()

    const smoothing = 1 - Math.exp(-safeDelta * 12)
    pointerNdc.current.lerp(pointerTarget.current, smoothing)
    rawVelocity.current.copy(pointerTarget.current).sub(previousPointer.current).divideScalar(Math.max(safeDelta, 0.001))
    rawVelocity.current.clampLength(0, 2.5)
    mouseVelocity.current.lerp(rawVelocity.current, 1 - Math.exp(-safeDelta * 7))
    mouseVelocity.current.multiplyScalar(Math.exp(-safeDelta * 1.7))
    previousPointer.current.copy(pointerTarget.current)
    pointerActive.current = THREE.MathUtils.damp(
      pointerActive.current,
      pointerInside.current ? 1 : 0,
      pointerInside.current ? 5 : 2.5,
      safeDelta,
    )
  })

  return (
    <ForestPointCloud
      pointCount={pointCount}
      pointerNdc={pointerNdc}
      mouseVelocity={mouseVelocity}
      pointerActive={pointerActive}
      attract={attractValue}
      tuning={tuning}
      reducedMotion={reducedMotion}
    />
  )
}
