'use client'

import { useEffect, useState } from 'react'

type ScanPolicyDemoProps = {
  labels?: { scanning: string; done: string }
}

/**
 * 保单扫描演示：深色实底 + 白渐变高光的保单卡，薄荷绿扫描线循环扫动，
 * 四角取景框，扫描一圈后弹出识别结果标签。文字全部实色不雾化。
 */
export function ScanPolicyDemo({
  labels = { scanning: '正在扫描保单…', done: '保单识别完成' },
}: ScanPolicyDemoProps) {
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setScanned(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative hidden shrink-0 select-none md:block" aria-hidden="true">
      {/* 四角取景框 */}
      <div className="pointer-events-none absolute -inset-4">
        <span className="absolute left-0 top-0 h-6 w-6 rounded-tl-sm border-l-2 border-t-2 border-[#c8e6d9]/60" />
        <span className="absolute right-0 top-0 h-6 w-6 rounded-tr-sm border-r-2 border-t-2 border-[#c8e6d9]/60" />
        <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-sm border-b-2 border-l-2 border-[#c8e6d9]/60" />
        <span className="absolute bottom-0 right-0 h-6 w-6 rounded-br-sm border-b-2 border-r-2 border-[#c8e6d9]/60" />
      </div>

      {/* 保单卡片（深色实底 + 白渐变高光） */}
      <div className="relative w-[320px] rounded-xl border border-white/15 bg-[#292a2b] bg-gradient-to-b from-white/[0.14] to-white/[0.05] p-6 text-white backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        {/* 头部 */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-semibold tracking-wide text-white">ENSUREOK INSURANCE</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-white/60">
              Policy Document · 保单
            </div>
          </div>
          <div className="rounded bg-white/15 px-2 py-1 text-[10px] tracking-wider text-white/85">
            P2026-0831
          </div>
        </div>

        {/* 信息行 */}
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
            <span className="text-[10px] uppercase tracking-widest text-white/60">Insured</span>
            <span className="text-[13px] font-medium text-white/95">张**</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
            <span className="text-[10px] uppercase tracking-widest text-white/60">Coverage</span>
            <span className="text-[13px] font-medium text-white/95">家庭综合保障计划</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-white/60">Valid</span>
            <span className="text-[13px] font-medium text-white/95">2026.01.15 – 2027.01.14</span>
          </div>
        </div>

        {/* 条款行（模拟） */}
        <div className="mt-5 space-y-2">
          <div className="h-1 w-full rounded-full bg-white/20" />
          <div className="h-1 w-11/12 rounded-full bg-white/20" />
          <div className="h-1 w-4/5 rounded-full bg-white/20" />
        </div>

        {/* 印章 + 落款 */}
        <div className="mt-5 flex items-end justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-300/60 text-[9px] leading-tight text-rose-300/90">
            已生效
          </div>
          <div className="text-[9px] uppercase tracking-widest text-white/55">
            Queshi Assurance · 确石保障
          </div>
        </div>
      </div>

      {/* 扫描线 + 光带 */}
      <div className="scanline pointer-events-none absolute inset-x-3" />
      <div className="scanline-glow pointer-events-none absolute inset-x-0" />

      {/* 识别结果标签 */}
      {scanned && (
        <>
          <div className="pop-in pointer-events-none absolute -right-14 top-8 flex items-center gap-1.5 rounded-full border border-[#c8e6d9]/50 bg-[#1e1f1f]/90 px-3 py-1.5 text-[11px] text-[#c8e6d9] backdrop-blur-sm">
            <span className="text-[#c8e6d9]">✓</span> 保单号已识别
          </div>
          <div
            className="pop-in pointer-events-none absolute -left-12 top-1/2 flex items-center gap-1.5 rounded-full border border-[#c8e6d9]/50 bg-[#1e1f1f]/90 px-3 py-1.5 text-[11px] text-[#c8e6d9] backdrop-blur-sm"
            style={{ animationDelay: '0.18s' }}
          >
            <span className="text-[#c8e6d9]">⚡</span> 条款已解析
          </div>
        </>
      )}

      {/* 状态文字 */}
      <div className="mt-6 flex items-center justify-center gap-2.5">
        <span className="relative flex h-2 w-2">
          {!scanned && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8e6d9] opacity-60" />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${scanned ? 'bg-[#c8e6d9]' : 'bg-[#c8e6d9]/70'}`}
          />
        </span>
        <span className="text-xs tracking-wide text-white/85">{scanned ? labels.done : labels.scanning}</span>
      </div>
    </div>
  )
}
