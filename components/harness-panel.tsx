'use client'

import { useEffect, useState } from 'react'

type HarnessPanelProps = {
  labels?: { running: string; done: string }
}

const LAYERS = [
  { en: 'APPLICATION' },
  { en: 'ORCHESTRATION' },
  { en: 'INTELLIGENCE' },
  { en: 'DATA' },
]

/**
 * Harness 层级：无卡片框架/取景框/识别标签，直接呈现在粒子背景上。
 * 4 个技术层级（LAYER 1–4）一层一层错落堆叠，光点贯穿各层，扫描线扫过后逐层点亮。
 */
export function HarnessPanel({
  labels = { running: '正在编排保障方案…', done: 'Harness 编排就绪' },
}: HarnessPanelProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative hidden w-[320px] shrink-0 select-none md:block" aria-hidden="true">
      {/* 顶部标签 */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold tracking-[0.18em] text-white">HARNESS ENGINE</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
          Layer Stack · 层级编排
        </span>
      </div>

      {/* 层级堆叠（一层一层叠起来） */}
      <div className="relative mt-5 h-[244px]">
        {/* 贯穿各层的光点 */}
        <span className="layer-flow h-2 w-2 rounded-full bg-[#c8e6d9]" />
        {LAYERS.map((layer, i) => (
          <div
            key={layer.en}
            className={`absolute left-1/2 rounded-lg border px-4 py-3 backdrop-blur-md transition-all duration-500 ${
              ready
                ? 'border-[#c8e6d9]/80 bg-[#c8e6d9]/[0.72]'
                : 'border-white/40 bg-white/[0.62]'
            }`}
            style={{
              width: 272 - i * 16,
              top: 10 + i * 40,
              transform: `translateX(calc(-50% + ${i * 26}px))`,
              opacity: 1 - i * 0.01,
              transitionDelay: `${i * 90}ms`,
              boxShadow: ready
                ? '0 -4px 0 rgba(118,168,148,1), 0 20px 34px rgba(0,0,0,0.6)'
                : '0 -4px 0 rgba(148,149,150,0.9), 0 20px 34px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                    ready ? 'bg-[#c8e6d9]' : 'bg-white/25'
                  }`}
                />
                <span className={`text-[10px] font-semibold tracking-wide ${ready ? 'text-white' : 'text-white/90'}`}>
                  {layer.en}
                </span>
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#c8e6d9]/90">
                LAYER {LAYERS.length - i}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 状态文字 */}
      <div className="mt-6 flex items-center justify-center gap-2.5">
        <span className="relative flex h-2 w-2">
          {!ready && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8e6d9] opacity-60" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${ready ? 'bg-[#c8e6d9]' : 'bg-[#c8e6d9]/70'}`}
          />
        </span>
        <span className="text-xs tracking-wide text-white/85">{ready ? labels.done : labels.running}</span>
      </div>
    </div>
  )
}
