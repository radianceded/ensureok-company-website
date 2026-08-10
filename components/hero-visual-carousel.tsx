'use client'

import { useEffect, useState } from 'react'
import { ScanPolicyDemo } from './scan-policy-demo'
import { HarnessPanel } from './harness-panel'

type HeroVisualCarouselProps = {
  labels: {
    scanning: string
    scanned: string
    running: string
    done: string
  }
  onIndexChange?: (index: number) => void
}

/**
 * Hero 视觉轮播：扫描保单 → Harness 编排枢纽，每 5.5s 自动切换，
 * 淡入淡出过渡 + 底部指示点。容器固定 540×420。
 */
export function HeroVisualCarousel({ labels, onIndexChange }: HeroVisualCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % 2), 5500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    onIndexChange?.(index)
  }, [index, onIndexChange])

  return (
    <div className="relative hidden h-[420px] w-[540px] shrink-0 md:block">
      {/* 面板 0：扫描保单（切换时上浮淡入特效） */}
      {index === 0 && (
        <div className="rise-in absolute inset-0 flex items-center justify-center">
          <ScanPolicyDemo labels={{ scanning: labels.scanning, done: labels.scanned }} />
        </div>
      )}

      {/* 面板 1：Harness 层级卡 */}
      {index === 1 && (
        <div className="rise-in absolute inset-0 flex items-center justify-center">
          <HarnessPanel labels={{ running: labels.running, done: labels.done }} />
        </div>
      )}

      {/* 指示点 */}
      <div className="absolute -bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`rounded-full transition-all duration-400 ${
              index === i ? 'h-1.5 w-5 bg-[#c8e6d9]' : 'h-1.5 w-1.5 bg-white/25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
