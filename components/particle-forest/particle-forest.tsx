'use client'

import { Canvas } from '@react-three/fiber'
import { type MutableRefObject, useEffect, useState } from 'react'
import { ForestDevControls } from './forest-dev-controls'
import { ParticleScene } from './particle-scene'

export type ForestTuning = {
  pointScale: number
  opacity: number
  cameraSpeed: number
  density: number
  interactionRadius: number
  repulsion: number
  swirl: number
  depth: number
  velocity: number
  fog: number
}

const DEFAULT_TUNING: ForestTuning = {
  pointScale: 1.78,
  opacity: 0.8,
  cameraSpeed: 0.7,
  density: 0.9,
  interactionRadius: 0.52,
  repulsion: 1.42,
  swirl: 1.18,
  depth: 0.86,
  velocity: 2.45,
  fog: 0.25,
}

function StaticForestFallback() {
  return (
    <div className="absolute inset-0 bg-background" aria-hidden="true">
      <div className="forest-static-texture absolute inset-0" />
    </div>
  )
}

export function ParticleForest({ attract, active = true }: { attract?: MutableRefObject<{ value: number }>; active?: boolean }) {
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [visible, setVisible] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [tuning, setTuning] = useState(DEFAULT_TUNING)
  const isDevelopment = process.env.NODE_ENV === 'development'

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setIsMobile(mobileQuery.matches)
      setReducedMotion(motionQuery.matches)
    }
    const onVisibility = () => setVisible(document.visibilityState === 'visible')
    const onKeyDown = (event: KeyboardEvent) => {
      if (isDevelopment && event.key.toLowerCase() === 'd' && !event.repeat) {
        setShowControls((current) => !current)
      }
    }
    update()
    onVisibility()
    mobileQuery.addEventListener('change', update)
    motionQuery.addEventListener('change', update)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      mobileQuery.removeEventListener('change', update)
      motionQuery.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isDevelopment])

  return (
    <>
      <div className="fixed inset-0 bg-background" aria-hidden="true">
        {visible ? (
          <Canvas
            fallback={<StaticForestFallback />}
            dpr={isMobile ? 1 : [1, 1.25]}
            frameloop={active && !reducedMotion ? 'always' : 'demand'}
            camera={{ fov: 48, near: 0.06, far: 145, position: [0, 0.35, 3] }}
            gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => gl.setClearColor('#1e1f1f', 1)}
          >
            <ParticleScene
              pointCount={isMobile ? 42_000 : 105_000}
              reducedMotion={reducedMotion}
              tuning={tuning}
              attract={attract}
            />
          </Canvas>
        ) : (
          <StaticForestFallback />
        )}
      </div>
      {isDevelopment && showControls ? <ForestDevControls values={tuning} onChange={setTuning} /> : null}
    </>
  )
}
