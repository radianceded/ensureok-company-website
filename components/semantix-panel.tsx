'use client'

import { useEffect, useState } from 'react'

type SemantixPanelProps = {
  labels?: { running: string; done: string }
}

/**
 * Semantix 视觉：EnsureOK 品牌标志。
 */
export function SemantixPanel({
  labels = { running: '正在认识你…', done: '喵 · 已就绪' },
}: SemantixPanelProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative hidden w-[380px] shrink-0 select-none md:block" aria-hidden="true">
      {/* 顶部标签 */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold tracking-[0.18em] text-white">SEMANTIX KERNEL</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">EnsureOK · 品牌</span>
      </div>

      {/* EnsureOK logo（居中，薄荷绿） */}
      <div className="relative mt-4 flex h-[244px] items-center justify-center">
        <div
          className="relative flex h-52 w-[360px] items-center justify-center"
        >
          <span
            className="ensureok-logo h-52 w-[360px] text-[#c8e6d9]"
            role="img"
            aria-label="EnsureOK logo"
          />

          {/* 就绪光晕 */}
          <span
            className={`pointer-events-none absolute -inset-6 rounded-full transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ background: 'transparent' }}
          />
        </div>
      </div>

      {/* 状态文字 */}
      <div className="mt-1 flex items-center justify-center gap-2.5">
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
