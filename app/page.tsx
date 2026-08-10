'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ArrowRight, ShieldCheck, Target, Fish } from 'lucide-react'
import gsap from 'gsap'
import { ParticleForest } from '@/components/particle-forest/particle-forest'
import { HeroVisualCarousel } from '@/components/hero-visual-carousel'

type Locale = 'zh' | 'en'

const copy = {
  zh: {
    navHome: '首页',
    navProduct: '确石智能体',
    navAbout: '关于我们',
    navContact: '联系我们',
    heroTag: 'Queshi Intelligence · 确石智能',
    heroTitle1: '让 AI 推理',
    heroTitle2: '更省 · 更准',
    heroDesc1: '确石智能专注大模型推理基础设施与智能分析',
    heroDesc2: '降低推理成本，提升决策精度',
    pill1: 'LLM 缓存优化',
    pill2: 'EnsureOK 智能保障',
    ctaPrimary: '了解产品',
    ctaSecondary: '预约演示',
    clickToEnter: '点击进入',
    langLabel: 'EN',
    page2Tag: '为什么选择我们',
    page2Title: '为大规模推理基础设施而生',
    page2Desc: '从缓存、分析与保障三个维度，降低推理成本、提升决策精度。',
    card1Title: '保对了',
    card1Desc: '更多产品详情，请联系我们。',
    card2Title: '保叔',
    card2Desc: '更多产品详情，请联系我们。',
    card3Title: 'Shrimper',
    card3Desc: '更多产品详情，请联系我们。',
    ctaMore: '了解更多',
    productsTag: '我们的产品',
    scanning: '正在扫描保单…',
    scanned: '保单识别完成',
    running: '正在编排保障方案…',
    done: 'Harness 编排就绪',
    harnessSlogan: '驾驭一切 · 智能编排',
    scanSlogan: '智能分析 · 保单解析',
    pipelineTag: '实时',
    statProcessed: '已处理',
    statLatency: '平均耗时',
    statAccuracy: '识别率',
  },
  en: {
    navHome: 'Home',
    navProduct: 'Queshi Agents',
    navAbout: 'About',
    navContact: 'Contact',
    heroTag: 'Queshi Intelligence · 确石智能',
    heroTitle1: 'Smarter AI inference',
    heroTitle2: 'Lower cost · Greater accuracy',
    heroDesc1: 'Queshi Intelligence builds LLM inference infra & intelligent analytics',
    heroDesc2: 'Lowering inference cost, sharpening decision accuracy',
    pill1: 'LLM Cache Optimization',
    pill2: 'EnsureOK Assurance',
    ctaPrimary: 'Learn More',
    ctaSecondary: 'Request a Demo',
    clickToEnter: 'Click to enter',
    langLabel: '中',
    page2Tag: 'Why Choose Us',
    page2Title: 'Built for large-scale inference infrastructure',
    page2Desc: 'Lower inference cost and sharpen decision accuracy across caching, analytics, and assurance.',
    card1Title: '保对了',
    card1Desc: 'Contact us for product details.',
    card2Title: '保叔',
    card2Desc: 'Contact us for product details.',
    card3Title: 'Shrimper',
    card3Desc: 'Contact us for product details.',
    ctaMore: 'Learn more',
    productsTag: 'Our Products',
    scanning: 'Scanning policy…',
    scanned: 'Policy recognized',
    running: 'Orchestrating…',
    done: 'Harness ready',
    harnessSlogan: 'Orchestrate Everything',
    scanSlogan: 'Smart Policy Analysis',
    pipelineTag: 'Live',
    statProcessed: 'Processed',
    statLatency: 'Avg Latency',
    statAccuracy: 'Accuracy',
  },
} satisfies Record<Locale, Record<string, string>>

export default function Page() {
  const [locale, setLocale] = useState<Locale>('zh')
  const [entered, setEntered] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const t = copy[locale]

  const NAV_KEYS = ['home', 'agents', 'about']

  const attract = useRef({ value: 0 }) // 恒 0：粒子全程自然运动，不汇聚不爆发
  const logoRef = useRef<HTMLSpanElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const siteRef = useRef<HTMLElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const started = useRef(false)

  // 挂载时无需 GSAP 位移 — 居中由 margin 负值保证，GSAP 只做 scale
  useEffect(() => {
    gsap.set(logoRef.current, { transformOrigin: '48.9% 40.4%' })
  }, [])

  const handleEnter = () => {
    if (started.current) return
    started.current = true

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

    // 第一阶段：Logo 以菱形正中心为轴心，同比例向四周扩散放大（不位移、不漂移）
    tl.to(hintRef.current, { opacity: 0, duration: 0.6 }, 0.1)
    tl.to(logoRef.current, {
      scale: 40,
      duration: 3.0,
      ease: 'expo.inOut',
      transformOrigin: '48.9% 40.4%', // 放大轴心 = 菱形正中心
    }, 0.2)
    // 淡出提前：放大初段即开始变透明，2.0s 前完成（此时 logo 已碰到屏幕上下边缘）
    tl.to(logoRef.current, { opacity: 0, duration: 1.2, ease: 'power1.inOut' }, 0.8)

    // 消散：轻微 blur 掩盖大图放大像素感（自然融入，非爆炸）
    tl.to(logoRef.current, { filter: 'blur(8px)', duration: 0.8, ease: 'power1.inOut' }, 2.3)

    // 第二阶段：主页内容浮现 — 折中节奏：放大接近完成时出现，不拖沓
    tl.to(siteRef.current, { opacity: 1, duration: 2.0, ease: 'power2.out' }, 1.8)
      .to(siteRef.current, { scale: 1, duration: 2.2, ease: 'power2.out' }, 1.8)
    tl.to(heroRef.current, { pointerEvents: 'none', duration: 0 }, 2.0)
    tl.to(siteRef.current, { pointerEvents: 'auto', duration: 0 }, 3.2)
    // 进入动画完成后解锁滚动，第二屏才可滑
    tl.call(() => setEntered(true), undefined, 3.4)
  }

  return (
    <main
      className={`relative isolate bg-background text-foreground ${entered ? '' : 'h-svh overflow-hidden'}`}
    >
      {/* 粒子空间 — 常驻，连续运动（fixed 于视口，滚动时持续流动） */}
      <div className="fixed inset-0">
        <ParticleForest attract={attract} />
      </div>

      {/* 第一屏：入口 → 主页（保持原效果） */}
      <div className="relative h-svh overflow-hidden">
      {/* 入口层：Logo 逐渐融入粒子 */}
      <section
        ref={heroRef}
        onClick={handleEnter}
        className="absolute inset-0 z-10 cursor-pointer"
      >
        {/* Logo：margin 负值把元素中心精确钉在视口中心，GSAP 只做 scale */}
        <span
          ref={logoRef}
          className="ensureok-logo absolute left-1/2 top-1/2 block aspect-square w-[min(56vw,28rem)] text-white"
          style={{
            filter: 'blur(0px)',
            transformOrigin: '48.9% 40.4%',
            marginLeft: 'calc(min(56vw,28rem) / -2)',
            marginTop: 'calc(min(56vw,28rem) / -2)',
          }}
          role="img"
          aria-label="ENSUREOK"
        />
        <p
          ref={hintRef}
          className="absolute left-1/2 top-[calc(50%+14rem)] -translate-x-1/2 text-xs font-medium tracking-[0.35em] text-white/80 uppercase"
        >
          {t.clickToEnter}
        </p>
      </section>

      {/* 主页层：从粒子空间中浮现（初始不拦截点击） */}
      <section
        ref={siteRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col px-8 pt-4 pb-8 opacity-0"
        style={{ scale: '0.965' }}
      >
        {/* 顶部导航 — 大 logo + 标语 + 菜单 + 中英切换 */}
        <nav className="flex w-full items-center justify-between gap-6 px-6 pt-0">
          <span className="ensureok-logo h-20 w-20 text-white" role="img" aria-label="ENSUREOK" />
          <div className="flex items-center gap-8">
            <button
              onClick={() => setLocale((prev) => (prev === 'zh' ? 'en' : 'zh'))}
              className="rounded-full border border-white/30 px-3 py-1 text-[11px] font-medium tracking-wide text-white/80 transition hover:border-white/70 hover:text-white"
              aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {t.langLabel}
            </button>
            <div className="hidden items-center gap-8 text-white/75 md:flex">
              <div className="flex items-center gap-8 py-1">
                {[t.navHome, t.navProduct, t.navAbout].map((label, i) => {
                  const key = NAV_KEYS[i]
                  return (
                    <span
                      key={key}
                      className="cursor-pointer whitespace-nowrap text-[13px] font-normal transition hover:text-white"
                    >
                      {label}
                    </span>
                  )
                })}
              </div>
              <span className="cursor-pointer rounded-full bg-white px-[1.125rem] py-2 text-[13px] font-medium text-[#1e1f1f] transition hover:bg-[#ddf6ee]">
                {t.navContact}
              </span>
            </div>
          </div>
        </nav>

        {/* Hero 区：左标语 — 中视觉轮播（扫描保单 ⇄ Harness 编排） */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* 左：品牌标语 */}
          <div className="absolute left-10 top-1/2 max-w-sm -translate-y-1/2 text-left">
            <p className="text-[0.65rem] tracking-[0.3em] text-white/60 uppercase">{t.heroTag}</p>
            <h2 className="mt-3 whitespace-nowrap text-5xl font-black leading-none tracking-tight text-white drop-shadow-[0_0_28px_rgba(200,230,217,0.3)] md:text-6xl">
              {t.heroTitle1}
              <br />
              {t.heroTitle2}
            </h2>
            <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#c8e6d9]">
              {t.heroDesc1}
              <br />
              {t.heroDesc2}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1e1f1f] transition hover:bg-white/90">
                {t.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* 中：视觉轮播（精确居中） */}
          <div className="shrink-0">
            <HeroVisualCarousel
              labels={{
                scanning: t.scanning,
                scanned: t.scanned,
                running: t.running,
                done: t.done,
              }}
              onIndexChange={setCarouselIndex}
            />
          </div>

          {/* 右：扫描态大字（切换时上浮淡入特效） */}
          {carouselIndex === 0 && (
            <div className="slide-in-right pointer-events-none absolute right-10 top-1/2 hidden max-w-sm -translate-y-1/2 text-right md:block">
              <div className="whitespace-nowrap text-5xl font-black leading-none tracking-tight text-white drop-shadow-[0_0_28px_rgba(200,230,217,0.3)] md:text-6xl">
                ANALYSE
              </div>
              <div className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#c8e6d9]">
                {t.scanSlogan}
              </div>
            </div>
          )}

          {/* 右：Harness 态大字 */}
          {carouselIndex === 1 && (
            <div className="slide-in-right pointer-events-none absolute right-10 top-1/2 hidden max-w-sm -translate-y-1/2 text-right md:block">
              <div className="whitespace-nowrap text-5xl font-black leading-none tracking-tight text-white drop-shadow-[0_0_28px_rgba(200,230,217,0.3)] md:text-6xl">
                HARNESS
              </div>
              <div className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#c8e6d9]">
                {t.harnessSlogan}
              </div>
            </div>
          )}
        </div>

        {/* 底部中央：向下滚动提示箭头（薄荷绿，贴近底部）——点击平滑滚动到第二屏 */}
        <button
          onClick={() => section2Ref.current?.scrollIntoView({ behavior: 'smooth' })}
          className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          aria-label={t.langLabel === 'EN' ? 'Scroll to features' : '滚动到产品特性'}
        >
          <ChevronDown className="h-6 w-6 animate-bounce text-[#c8e6d9]" strokeWidth={2.2} />
        </button>

        {/* 底部：版权 */}
        <div className="flex items-center justify-end">
          <span className="hidden text-[0.65rem] text-white/40 md:block">
            Copyright ©2026 EnsureOK All rights reserved
          </span>
        </div>
      </section>
      </div>

      {/* 第二屏：产品 01 — 保叔（保险管家） */}
      <section ref={section2Ref} className="relative z-20 flex min-h-svh flex-col items-center justify-center px-8 py-24">
        {/* 右侧内容块（镜像首页左标语布局，留出右侧边距） */}
        <div className="absolute right-24 top-1/2 max-w-sm -translate-y-1/2 text-left">
          <p className="text-[0.65rem] tracking-[0.3em] text-white/60 uppercase">ENSUREOK PRODUCT 01</p>
          <h2 className="mt-3 text-4xl font-black leading-none tracking-tight text-white drop-shadow-[0_0_28px_rgba(200,230,217,0.3)] md:text-6xl">
            保叔
          </h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#c8e6d9]">BAOSHU · 保险管家</p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            从投保到理赔的全流程智能管家，让每一份保单都有人管。占位文案 — 待补充。
          </p>
          <div className="mt-8 flex">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm">
              <ShieldCheck className="h-14 w-14 text-[#c8e6d9]" strokeWidth={1.5} />
            </div>
          </div>
          <button className="mt-8 rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            了解更多
          </button>
        </div>
      </section>

      {/* 第三屏：产品 02 — 保对了（智能投保） */}
      <section className="relative z-20 flex min-h-svh flex-col items-center justify-center px-8 py-24">
        <div className="max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">ENSUREOK PRODUCT 02</p>
          <h2 className="mt-4 text-4xl font-black leading-none tracking-tight text-white drop-shadow-[0_0_28px_rgba(200,230,217,0.3)] md:text-6xl">
            保对了
          </h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#c8e6d9]">BAODUILE · 智能投保</p>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            精准匹配你的保障需求，买对不买贵。占位文案 — 待补充。
          </p>
          <div className="mt-10 flex justify-center">
            <div className="flex h-44 w-44 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm">
              <Target className="h-16 w-16 text-[#c8e6d9]" strokeWidth={1.5} />
            </div>
          </div>
          <button className="mt-10 rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            了解更多
          </button>
        </div>
      </section>

      {/* 第四屏：产品 03 — Shrimper（虾产业数字化） */}
      <section className="relative z-20 flex min-h-svh flex-col items-center justify-center px-8 py-24">
        <div className="max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">ENSUREOK PRODUCT 03</p>
          <h2 className="mt-4 text-4xl font-black leading-none tracking-tight text-white drop-shadow-[0_0_28px_rgba(200,230,217,0.3)] md:text-6xl">
            Shrimper
          </h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#c8e6d9]">SHRIMPER · 智慧养虾</p>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            从虾苗到餐桌的全链路数字化管理，让每一只虾可溯源。占位文案 — 待补充。
          </p>
          <div className="mt-10 flex justify-center">
            <div className="flex h-44 w-44 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm">
              <Fish className="h-16 w-16 text-[#c8e6d9]" strokeWidth={1.5} />
            </div>
          </div>
          <button className="mt-10 rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            了解更多
          </button>
        </div>
      </section>
    </main>
  )
}
