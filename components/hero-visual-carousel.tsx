'use client'

import { useEffect, useRef, useState } from 'react'
import { ScanPolicyDemo } from './scan-policy-demo'
import { HarnessPanel } from './harness-panel'
import { SemantixPanel } from './semantix-panel'

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
 * Hero 视觉轮播：扫描保单 → Harness 编排 → Semantix 语义缓存，每 5.5s 自动切换，
 * 淡入淡出过渡 + 底部指示点。容器固定 540×420。
 */
export function HeroVisualCarousel({ labels, onIndexChange }: HeroVisualCarouselProps) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 进入后先停在"保单分析"，6s 后开始自动轮播；手动点击后重新计时
  useEffect(() => {
    const startDelay = setTimeout(() => {
      timerRef.current = setInterval(() => setIndex((i) => (i + 1) % 3), 3000)
    }, 6000)
    return () => {
      clearTimeout(startDelay)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleDotClick = (i: number) => {
    setIndex(i)
    // 重置自动计时：手动切换后重新从 5.5s 开始
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setIndex((j) => (j + 1) % 3), 3000)
  }

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

      {/* 面板 2：Semantix 猫 */}
      {index === 2 && (
        <div className="rise-in absolute inset-0 flex items-center justify-center">
          <SemantixPanel />
        </div>
      )}

      {/* 指示点（可点击手动切换） */}
      <div className="absolute -bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`切换到面板 ${i + 1}`}
            onClick={() => handleDotClick(i)}
            className={`cursor-pointer rounded-full transition-all duration-400 ${
              index === i ? 'h-1.5 w-5 bg-[#c8e6d9]' : 'h-1.5 w-1.5 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
