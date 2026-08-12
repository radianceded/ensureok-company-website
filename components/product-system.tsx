'use client'

import { ArrowRight, Cpu, House, Network, ShieldCheck } from 'lucide-react'

type ProductSystemProps = {
  onBaoduile: () => void
  onBaoshu: () => void
  onShrimper: () => void
  onSemantix: () => void
}

export function ProductSystem({ onBaoduile, onBaoshu, onShrimper, onSemantix }: ProductSystemProps) {
  return (
    <section className="relative z-20 flex min-h-svh flex-col items-center justify-start px-4 pt-16 pb-14 sm:px-8">
      <div className="map-reveal mx-auto max-w-3xl text-center">
        <p className="text-sm tracking-[0.16em] text-[#dff3e8]">产品地图</p>
        <h2 className="mt-3 font-brand text-3xl font-black tracking-tight text-white md:text-5xl">
          两端产品，<span className="text-[#c8e6d9]">一套底座</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-white">
          从上往下读：先服务人，再落到把 Agent 真正跑起来的系统能力。
        </p>
      </div>

      <div className="mx-auto mt-6 w-full max-w-4xl">
        <div className="map-reveal">
          <p className="text-center text-xs tracking-[0.2em] text-white/80">应用层</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {/* B 端 · 经纪人 — 保叔 */}
            <button
              type="button"
              onClick={onBaoshu}
              className="group rounded-2xl border border-white/15 bg-[#121414]/80 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8e6d9]/50 hover:bg-[#161c1a]/90"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs tracking-[0.16em] text-[#e7f6ee]">B 端 · 经纪人</span>
                <ShieldCheck className="h-5 w-5 text-[#c8e6d9] transition group-hover:scale-110" strokeWidth={1.5} />
              </div>
              <h3 className="mt-2 font-brand text-xl font-black text-[#c8e6d9]">保叔</h3>
              <p className="mt-1 text-sm font-medium text-[#e7f6ee]">飞书里的 AI 同事</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">内容、获客、方案与保单管理，嵌进日常工作流</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#e7f6ee]">
                进入详情
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </button>

            {/* C 端 · 家庭 — 保对了 */}
            <button
              type="button"
              onClick={onBaoduile}
              className="group rounded-2xl border border-white/15 bg-[#121414]/80 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8e6d9]/50 hover:bg-[#161c1a]/90"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs tracking-[0.16em] text-[#e7f6ee]">C 端 · 家庭</span>
                <House className="h-5 w-5 text-[#c8e6d9] transition group-hover:scale-110" strokeWidth={1.5} />
              </div>
              <h3 className="mt-2 font-brand text-xl font-black text-[#c8e6d9]">保对了</h3>
              <p className="mt-1 text-sm font-medium text-[#e7f6ee]">家庭保障 AI 助手</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                看懂自己的保单、看清家庭保障，类目级规划建议，全程无销售压力
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#e7f6ee]">
                进入详情
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </button>

            {/* Agent 智能体内核 — Semantix */}
            <button
              type="button"
              onClick={onSemantix}
              className="group rounded-2xl border border-white/15 bg-[#121414]/80 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8e6d9]/50 hover:bg-[#161c1a]/90"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs tracking-[0.16em] text-[#e7f6ee]">智能体内核</span>
                <Cpu className="h-5 w-5 text-[#c8e6d9] transition group-hover:scale-110" strokeWidth={1.5} />
              </div>
              <h3 className="mt-2 font-brand text-xl font-black text-[#c8e6d9]">Semantix</h3>
              <p className="mt-1 text-sm font-medium text-[#e7f6ee]">语义缓存 · 自我进化</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">让每个 Agent 拥有持续进化的记忆与推理内核</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#e7f6ee]">
                进入详情
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>

          {/* 应用层 → 底座层连接线（紧凑） */}
          <div className="my-3 flex flex-col items-center gap-1" aria-hidden="true">
            <span className="h-3 w-px bg-[#c8e6d9]/40" />
            <span className="h-2 w-px bg-[#c8e6d9]/30" />
            <span className="h-2 w-px bg-[#c8e6d9]/20" />
          </div>
        </div>

        <div className="map-reveal">
          <p className="text-center text-xs tracking-[0.2em] text-white/80">底座层</p>
          {/* 运行时 · 开源内核 — Shrimper */}
          <button
            type="button"
            onClick={onShrimper}
            className="group mt-3 w-full rounded-2xl border border-white/15 bg-[#121414]/80 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8e6d9]/50 hover:bg-[#161c1a]/90"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs tracking-[0.16em] text-[#e7f6ee]">运行时 · 开源内核</span>
              <Network className="h-5 w-5 text-[#c8e6d9] transition group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <h3 className="mt-2 font-brand text-xl font-black text-[#c8e6d9] md:text-2xl">Shrimper</h3>
            <p className="mt-1 text-sm font-medium text-[#e7f6ee]">能力底座</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90">
              企业级编排在上，自进化优化在下，支撑全线产品
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#e7f6ee]">
              进入详情
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
