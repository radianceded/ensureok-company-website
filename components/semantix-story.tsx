'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const capabilities = [
  {
    id: '01',
    title: '语义缓存',
    en: 'SEMANTIC CACHE',
    summary: '识别“意思相近”的请求，让已有推理结果被更聪明地复用。',
    signal: '相似语义 / 命中复用',
    mechanism: '系统将新请求转换为可比较的语义表示，并在缓存中寻找含义相近、上下文条件兼容的历史结果。命中后直接复用可信结果，未命中才进入完整推理。',
    steps: [
      ['编码', '理解请求含义与必要上下文'],
      ['匹配', '检索可复用的近义请求结果'],
      ['复用', '返回结果并保留来源关系'],
    ],
    outcome: '减少同义问题反复进入完整模型调用。',
    art: '/semantix-cache-transparent.png',
    artAlt: '两张被扫描线切分的古典侧脸相互回应，象征相似语义被识别和复用',
  },
  {
    id: '02',
    title: '推理优化',
    en: 'INFERENCE OPTIMIZATION',
    summary: '减少重复调用与无效计算，在保持体验的同时降低推理成本。',
    signal: '减少重复 / 缩短路径',
    mechanism: '缓存未命中时，Semantix 仍会整理已有上下文，过滤重复信息，并把当前任务需要的内容送入推理链路。结果随后回写，为下一次相似请求建立更短路径。',
    steps: [
      ['整理', '合并重复信息与已知条件'],
      ['推理', '只处理当前任务的有效增量'],
      ['回写', '把新结果加入可复用上下文'],
    ],
    outcome: '让计算集中在真正新增的问题上。',
    art: '/semantix-inference-transparent.png',
    artAlt: '古典人物的手从扭曲迷宫中拉出一条清晰路径，象征缩短推理链路',
  },
  {
    id: '03',
    title: '记忆沉淀',
    en: 'PERSISTENT MEMORY',
    summary: '把有价值的上下文持续留下，让 Agent 不必每一次都从零开始。',
    signal: '上下文 / 持续积累',
    mechanism: '任务中的事实、偏好、决策与有效过程被整理成可检索记忆。它们不只是保存原始对话，而是保留来源、关系和使用条件，在之后的任务中按需召回。',
    steps: [
      ['捕获', '识别值得长期保留的信息'],
      ['组织', '建立来源、关系与使用边界'],
      ['召回', '在相关任务中补充必要上下文'],
    ],
    outcome: '跨会话延续项目理解和用户偏好。',
    art: '/semantix-memory-transparent.png',
    artAlt: '由多层扫描线与眼睛和手的碎片组成的记忆女神头像，象征上下文持续沉淀',
  },
  {
    id: '04',
    title: '自我进化',
    en: 'SELF EVOLUTION',
    summary: '让每一次交互都成为下一次推理可以利用的经验。',
    signal: '交互反馈 / 能力生长',
    mechanism: 'Semantix 将任务结果、用户修正和后续表现连接起来，识别哪些方法应该保留、调整或淘汰。新的经验回到记忆与缓存循环，持续改善下一次响应。',
    steps: [
      ['观察', '记录结果与真实使用反馈'],
      ['校正', '区分有效经验和错误路径'],
      ['更新', '将改进后的经验送回循环'],
    ],
    outcome: '让系统从连续使用中形成更稳定的判断。',
    art: '/semantix-evolution-transparent.png',
    artAlt: '多臂古典人物用线束重塑另一具雕像，象征反馈驱动的持续进化',
  },
]

export function SemantixStory() {
  const [active, setActive] = useState<number | null>(null)
  const mastheadTrackRef = useRef<HTMLDivElement>(null)
  const mastheadRef = useRef<HTMLDivElement>(null)
  const mastheadWordRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let frame = 0
    const carbon = [10, 14, 14]
    const paper = [247, 246, 241]

    const updateMasthead = () => {
      frame = 0
      const track = mastheadTrackRef.current
      const surface = mastheadRef.current
      const word = mastheadWordRef.current
      if (!track || !surface || !word) return

      const rect = track.getBoundingClientRect()
      const travel = Math.max(1, track.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / travel))
      const open = progress < 0.28 ? progress / 0.28 : progress < 0.66 ? 1 : Math.max(0, (1 - progress) / 0.34)
      const light = Math.min(1, Math.max(0, (progress - 0.58) / 0.3))
      const mix = carbon.map((value, index) => Math.round(value + (paper[index] - value) * light))

      surface.style.backgroundColor = `rgb(${mix.join(' ')})`
      word.style.opacity = String(open)
      word.style.transform = `scaleX(${0.56 + open * 0.37}) scaleY(${1.04 - open * 0.04})`
      word.style.clipPath = `inset(0 ${49 * (1 - open)}% 0 ${49 * (1 - open)}%)`
      const metaColor = mix.map((value) => 255 - value)
      surface.querySelectorAll<HTMLElement>('.semantix-masthead-meta').forEach((element) => {
        element.style.color = `rgb(${metaColor.join(' ')} / 0.68)`
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMasthead)
    }
    updateMasthead()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const capabilityButton = (index: number) => {
    const item = capabilities[index]
    const isActive = active === index
    const pair = index < 2 ? 'cache' : 'memory'

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => setActive(isActive ? null : index)}
        aria-expanded={isActive}
        aria-controls={`semantix-${pair}-detail`}
        className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-[#101313]/20 py-5 text-left md:grid-cols-[5rem_1fr_auto] md:py-7"
      >
        <span className={`font-mono text-[10px] tracking-[0.16em] transition-colors ${isActive ? 'text-[#168b6d]' : 'text-[#101313]/35'}`}>{item.id}</span>
        <span>
          <span className={`font-editorial-display block text-2xl font-black tracking-[-0.03em] transition-transform duration-500 md:text-4xl ${isActive ? 'translate-x-2 text-[#101313]' : 'text-[#101313]/45 group-hover:translate-x-1 group-hover:text-[#101313]/75'}`}>{item.title}</span>
          <span className={`mt-1 block font-mono text-[9px] tracking-[0.18em] transition-colors ${isActive ? 'text-[#168b6d]' : 'text-[#101313]/30'}`}>{item.en}</span>
        </span>
        <span className={`h-3 w-3 rotate-45 border transition-all duration-500 ${isActive ? 'border-[#168b6d] bg-[#168b6d]' : 'border-[#101313]/30 bg-transparent'}`} />
      </button>
    )
  }

  const capabilityPanel = (pair: 'cache' | 'memory', indices: [number, number]) => {
    const isOpen = active !== null && indices.includes(active)
    const selected = isOpen ? capabilities[active] : null

    return (
      <div
        id={`semantix-${pair}-detail`}
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="relative min-h-[38rem] overflow-hidden border-b border-[#101313] bg-[#2c8c75] text-[#f7f6f1] md:min-h-[34rem]">
            <div className="absolute inset-0 opacity-20 semantix-grid" aria-hidden="true" />
            {selected && (
              <div className="relative min-h-[38rem] md:min-h-[34rem]">
                <Image
                  key={`${selected.id}-art`}
                  src={selected.art}
                  alt={selected.artAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 52vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015] motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-[#2c8c75]/72 md:bg-[linear-gradient(90deg,rgba(44,140,117,0.99)_0%,rgba(44,140,117,0.94)_38%,rgba(44,140,117,0.62)_62%,rgba(44,140,117,0.08)_100%)]" aria-hidden="true" />

                <div className="relative z-[1] flex min-h-[38rem] min-w-0 flex-col p-6 md:min-h-[34rem] md:max-w-[64%] md:p-9 lg:p-10">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#bde8d9]">{pair === 'cache' ? 'CACHE LOOP' : 'MEMORY LOOP'} / {selected.id}</p>
                    <div className="flex gap-1.5" aria-hidden="true">
                      {indices.map((index) => <span key={index} className={`h-1.5 transition-all duration-500 ${index === active ? 'w-8 bg-[#bde8d9]' : 'w-1.5 bg-white/20'}`} />)}
                    </div>
                  </div>
                  <div className="semantix-detail-in my-auto py-8" key={selected.id}>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-white/35">{selected.signal}</p>
                    <h4 className="mt-4 font-brand text-4xl font-black tracking-[-0.04em] md:text-5xl lg:text-6xl">{selected.title}</h4>
                    <p className="mt-4 max-w-xl font-brand text-sm font-bold leading-7 text-white/70 md:text-base">{selected.summary}</p>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/48">{selected.mechanism}</p>

                    <div className="mt-7 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-3">
                      {selected.steps.map(([label, description]) => (
                        <div key={label} className="bg-[#237561] p-4">
                          <p className="font-mono text-[10px] tracking-[0.16em] text-[#bde8d9]">{label}</p>
                          <p className="mt-2 text-xs leading-5 text-white/48">{description}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 border-l border-[#bde8d9]/50 pl-4 text-xs leading-6 text-white/55">结果：{selected.outcome}</p>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.18em] text-white/35">
                    <span className="h-px flex-1 bg-white/15" />
                    {pair === 'cache' ? 'SEMANTIC MATCH → INFERENCE REUSE' : 'MEMORY → FEEDBACK → EVOLUTION'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-x-clip bg-[#f7f6f1] text-[#101313]">
      <div ref={mastheadTrackRef} className="semantix-masthead-track relative h-[210svh] border-b border-[#101313]/15">
        <div ref={mastheadRef} className="semantix-masthead sticky top-0 h-svh overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 pt-6 md:px-10 md:pt-8">
            <p className="semantix-masthead-meta font-mono text-[10px] leading-relaxed tracking-[0.22em]">ENSUREOK / 04<br />AGENT KERNEL</p>
            <p className="semantix-masthead-meta max-w-[15rem] text-right font-brand text-xs font-bold leading-relaxed md:max-w-xs">让每个 Agent 拥有持续进化的<br className="hidden md:block" />记忆与推理内核</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <p
              ref={mastheadWordRef}
              className="semantix-masthead-word whitespace-nowrap text-[#168b6d]"
            >
              SEMANTIX
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-6 md:px-10 md:pb-8">
            <p className="semantix-masthead-meta font-mono text-[10px] tracking-[0.22em]">SEMANTIC MEMORY SYSTEM</p>
            <span className="h-2 w-2 rounded-full bg-[#168b6d] shadow-[0_0_0_6px_rgba(22,139,109,0.12)]" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <p className="font-mono text-[10px] tracking-[0.24em] text-[#168b6d]">WHAT SEMANTIX DOES</p>
          <h3 className="mt-7 max-w-xl font-brand text-[clamp(2.7rem,5.8vw,6.5rem)] font-black leading-[0.98] tracking-[-0.02em]">让每次推理，<br />成为下一次的<br /><span className="text-[#168b6d]">上下文。</span></h3>
          <p className="mt-8 max-w-md font-brand text-sm font-bold leading-7 text-[#101313]/55">Semantix 面向智能体的记忆与推理场景，通过语义缓存与持续积累，减少重复计算，让 Agent 越用越懂上下文。</p>
          <a href="https://github.com/Gnosil/semantix" target="_blank" rel="noreferrer" className="group mt-9 inline-flex items-center gap-3 border-b border-[#101313] pb-2 font-mono text-[11px] tracking-[0.18em] transition-colors hover:border-[#168b6d] hover:text-[#168b6d]">VIEW GITHUB<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        </div>

        <div className="border-t border-[#101313]">
          <div className="flex items-center justify-between border-b border-[#101313]/20 py-5 font-mono text-sm font-semibold tracking-[0.16em] text-[#168b6d] md:text-base"><span>LOOP A / CACHE</span><span className="text-xs font-normal tracking-[0.14em] md:text-sm">匹配 → 复用</span></div>
          {capabilityButton(0)}
          {capabilityPanel('cache', [0, 1])}
          {capabilityButton(1)}

          <div className="mt-16 flex items-center justify-between border-b border-[#101313]/20 py-5 font-mono text-sm font-semibold tracking-[0.16em] text-[#168b6d] md:text-base"><span>LOOP B / MEMORY</span><span className="text-xs font-normal tracking-[0.14em] md:text-sm">沉淀 → 进化</span></div>
          {capabilityButton(2)}
          {capabilityPanel('memory', [2, 3])}
          {capabilityButton(3)}
        </div>
      </div>
    </div>
  )
}
