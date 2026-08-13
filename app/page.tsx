'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ArrowRight, FastForward, Rewind, Building2, FileSearch, Flame, MessageSquare, Network, Scale } from 'lucide-react'
import gsap from 'gsap'
import { ParticleForest } from '@/components/particle-forest/particle-forest'
import { HeroVisualCarousel } from '@/components/hero-visual-carousel'
import { ProductSystem } from '@/components/product-system'
import { SiteFooter } from '@/components/site-footer'

const SEMANTIX_URL = 'https://semantix.ensureok.ai/'
const BAODUILE_URL = 'https://www.ensureok.ai/'

type Locale = 'zh' | 'en'

const copy = {
  zh: {
    navHome: '首页',
    navSemantix: 'Semantix',
    navBaoduile: '保对了',
    navBaoshu: '保叔',
    navShrimper: 'Shrimper',
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
    card3Desc: '自研 N×N Agent 平台，支撑确石全线产品企业级落地。',
    ctaMore: '了解更多',
    productsTag: '我们的产品',
    scanning: '正在扫描保单…',
    scanned: '保单识别完成',
    running: '正在编排保障方案…',
    done: 'Harness 编排就绪',
    harnessSlogan: '驾驭一切 · 智能编排',
    semantixSlogan: '智能体内核 · 自我进化',
    scanSlogan: '智能分析 · 保单解析',
    pipelineTag: '实时',
    statProcessed: '已处理',
    statLatency: '平均耗时',
    statAccuracy: '识别率',
  },
  en: {
    navHome: 'Home',
    navSemantix: 'Semantix',
    navBaoduile: 'Baoduile',
    navBaoshu: 'Baoshu',
    navShrimper: 'Shrimper',
    navAbout: 'About',
    navContact: 'Contact',
    heroTag: 'Queshi Intelligence · 确石智能',
    heroTitle1: 'Smarter AI inference',
    heroTitle2: 'Lower cost · Higher accuracy',
    heroDesc1: 'LLM inference infra & intelligent analytics',
    heroDesc2: 'Cut cost. Sharpen decisions.',
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
    card3Desc: 'Homegrown N×N Agent platform powering all EnsureOK products.',
    ctaMore: 'Learn more',
    productsTag: 'Our Products',
    scanning: 'Scanning policy…',
    scanned: 'Policy recognized',
    running: 'Orchestrating…',
    done: 'Harness ready',
    harnessSlogan: 'Orchestrate Everything',
    semantixSlogan: 'Self-evolving Agent Kernel',
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
  const [activeNav, setActiveNav] = useState<'home' | 'baoduile' | 'baoshu' | 'shrimper'>('home')
  const [activeStep, setActiveStep] = useState(-1)
  const [expandedBrick, setExpandedBrick] = useState<string | null>(null)
  const [bricksGrown, setBricksGrown] = useState(false)
  const particlesActive = true
  const [ffActive, setFFActive] = useState<'forward' | 'backward' | null>(null)
  const [hoveredNav, setHoveredNav] = useState<(typeof NAV_KEYS)[number] | null>(null)
  const [lineCoords, setLineCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null)
  const t = copy[locale]

  const NAV_KEYS = ['home', 'semantix', 'baoduile', 'baoshu', 'shrimper'] as const

  // 滚动联动：readingLine 检测当前所在产品页，activeNav 跟随
  useEffect(() => {
    let frame = 0
    const updateActiveNav = () => {
      frame = 0
      const readingLine = window.scrollY + window.innerHeight * 0.5
      const productSections = [
        { key: 'baoduile' as const, element: section2Ref.current },
        { key: 'baoshu' as const, element: section3Ref.current },
        { key: 'shrimper' as const, element: section4Ref.current },
      ]
      let nextActive: 'home' | 'baoduile' | 'baoshu' | 'shrimper' = 'home'
      for (const section of productSections) {
        if (section.element && readingLine >= section.element.offsetTop) {
          nextActive = section.key
        }
      }
      setActiveNav(nextActive)
    }
    const requestActiveNavUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveNav)
    }
    updateActiveNav()
    window.addEventListener('scroll', requestActiveNavUpdate, { passive: true })
    return () => {
      window.removeEventListener('scroll', requestActiveNavUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const attract = useRef({ value: 0 }) // 恒 0：粒子全程自然运动，不汇聚不爆发
  const logoRef = useRef<HTMLSpanElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const siteRef = useRef<HTMLElement>(null)
  const productMapRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLElement>(null)
  const section3Ref = useRef<HTMLElement>(null)
  const section4Ref = useRef<HTMLElement>(null)
  const demoVideoRef = useRef<HTMLVideoElement>(null)
  const ffTargetRef = useRef<number | null>(null) // 快进过渡目标时间
  const ffRafRef = useRef(0) // 快退 rAF 句柄
  const videoBoxRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoDurRef = useRef(0)
  const started = useRef(false)

  // 保叔砖墙：滚动进入视口时，第三行（tall 砖）从 104px 逐渐长到 150px
  useEffect(() => {
    const el = section3Ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBricksGrown(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // 保对了 5 步流程数据（视频 4 段 ↔ 01-04）
  const FLOW_STEPS = [
    { num: '01', title: '上传保单', desc: '中英文保单识别险种、保额与关键条款' },
    { num: '02', title: 'AI 分析', desc: '智能拆解保单结构，精准识别保障盲区与风险' },
    { num: '03', title: '规划报告', desc: '类目级建议，不绑定具体产品' },
    { num: '04', title: 'AI 答疑', desc: '随时向 AI 提问，即时解答你的保单疑问' },
    { num: '05', title: '自愿对接', desc: '可选持牌经纪人，全程无销售压力' },
  ]
  // 保叔核心能力砖块（点击展开为讲解模式）
  const BRICKS = [
    { num: '01', en: 'identity', title: '人设 & 打法规划', desc: '输入你的背景，AI 帮你打造人设、规划获客打法', span: 'col-span-4', detail: '告诉保叔你的背景和擅长的领域，AI 帮你定人设、拆客群，生成一套可执行的内容打法。朋友圈、短视频、私聊话术都围绕它展开，不靠灵感，靠系统。' },
    { num: '02', en: 'proposal', title: '见客前方案', desc: '输入客户画像 → AI 给策略、做方案、出规划', span: 'col-span-2', detail: '见客户前把画像丢给保叔：家庭情况、预算、已有保单。AI 几分钟给出策略方向 + 方案草稿 + 话术提醒，见客不慌，成交率更高。' },
    { num: '03', en: 'review', title: '见客后复盘', desc: '录音扔给保叔 → AI 自动复盘，持续优化转化率', span: 'col-span-2', detail: '把和客户的对话录音丢进来，AI 自动转写复盘：哪些点客户有疑虑、下一步该跟进什么，给你明确建议，转化率一点点磨上去。' },
    { num: '04', en: 'knowledge', title: '知识沉淀', desc: '所有对话数据沉淀为你的私人知识库 + memory 库', span: 'col-span-4', detail: '每一次对话、每一份方案都沉淀成你的私人知识库。保叔记得你说过什么、客户在意什么，越用越懂你，形成别人抄不走的资产。' },
    { num: '05', en: 'workflow', title: '嵌进工作流', desc: '绑定飞书 / 企业微信，不换工具，一句话指令即用', span: 'col-span-4', tall: true, detail: '不用换工具。在飞书 / 企业微信里 @保叔 就能干活：写文案、查保单、出方案、提醒跟进，一句话指令，跟同事聊天一样自然。' },
    { num: '06', en: 'crm', title: '客户管理', desc: '客户池与跟进提醒，AI 记得每一个客户', span: 'col-span-2', tall: true, detail: '客户池自动整理：来源、状态、下一步行动一目了然。该跟进谁、几天没联系了，保叔主动提醒，客户不再悄悄流失。' },
    { num: '07', en: 'content', title: '内容生成', desc: '朋友圈、短视频脚本一键出稿，获客内容不用愁', span: 'col-span-3', detail: '朋友圈文案、短视频脚本、私聊开场白，给个主题 AI 就能出几版给你挑。持续输出专业形象，客户自己找上门。' },
    { num: '08', en: 'claim', title: '理赔协助', desc: '出险材料智能整理，理赔进度全程跟进', span: 'col-span-3', detail: '客户出险了别慌：保叔帮你梳理理赔材料清单、对照条款核对、跟进进度，让理赔更顺，客户更信任你。' },
  ]
  // 固定四行结构：展开只发生在原行，避免被点击的砖跳到第一行。
  const BRICK_ROWS = [BRICKS.slice(0, 2), BRICKS.slice(2, 4), BRICKS.slice(4, 6), BRICKS.slice(6, 8)]
  // 视频分段：内容边界 + 各段播放速率（01 慢 0.85，其余 0.95）
  // 实际播放时钟边界（内容时长 ÷ 速率）：01 5s/0.85=5.88s；02 +8s/0.95=14.3s；03 +18s/0.95=33.25s；04 至结尾
  const SEG_BOUNDS = [0, 5.88, 14.3, 33.25]
  const SEG_RATES = [0.85, 0.95, 0.95, 0.95]

  // 保对了视频：滑入视口才开始播放，离开暂停
  useEffect(() => {
    const v = demoVideoRef.current
    if (!v) return
    v.playbackRate = 0.95 // 整体放慢一点点
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) v.play().catch(() => {})
          else v.pause()
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [])

  // 视频进度 → 步骤联动（视频内容 4 段 ↔ 01-04 框）
  const handleVideoLoaded = () => {
    const v = demoVideoRef.current
    if (v && v.duration) videoDurRef.current = v.duration
  }
  const handleVideoTime = () => {
    const v = demoVideoRef.current
    if (!v) return
    // 快进过渡中：到达目标段起点即停（恢复正常段速）
    if (ffTargetRef.current !== null) {
      const t = ffTargetRef.current
      if (v.currentTime >= t - 0.05) {
        v.currentTime = t
        ffTargetRef.current = null
        const idx = SEG_BOUNDS.indexOf(t)
        setActiveStep(idx)
        v.playbackRate = SEG_RATES[idx]
        setFFActive(null)
      }
      return
    }
    // 正常播放：按显式分段边界定位当前步骤（含变速后的播放时钟）
    let idx = 0
    for (let i = 0; i < SEG_BOUNDS.length; i++) {
      if (v.currentTime >= SEG_BOUNDS[i]) idx = i
    }
    setActiveStep(idx)
    // 按段切换播放速率（01 更慢，其余 0.95）
    if (v.playbackRate !== SEG_RATES[idx]) v.playbackRate = SEG_RATES[idx]
  }

  // 连线：视频底部中心 → 激活步骤框顶部中心（activeStep 变化时测量）
  useEffect(() => {
    const videoBox = videoBoxRef.current
    const stepEl = activeStep >= 0 ? stepRefs.current[activeStep] : null
    if (!videoBox || !stepEl) {
      setLineCoords(null)
      return
    }
    const section = videoBox.closest('section')!
    const sr = section.getBoundingClientRect()
    const vr = videoBox.getBoundingClientRect()
    const cr = stepEl.getBoundingClientRect()
    setLineCoords({
      x1: vr.left - sr.left + vr.width / 2,
      y1: vr.bottom - sr.top + 6,
      x2: cr.left - sr.left + cr.width / 2,
      y2: cr.top - sr.top - 4,
    })
  }, [activeStep, locale])

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
        <ParticleForest attract={attract} active={particlesActive} />
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
            <div className="hidden items-center gap-5 text-white/75 md:flex xl:gap-8">
              {/* 产品菜单：下划线指示器（hover 跟随，active 常亮） */}
              <div className="flex items-center gap-5 py-1 xl:gap-8">
                {[t.navHome, t.navSemantix, t.navBaoduile, t.navBaoshu, t.navShrimper].map((label, i) => {
                  const key = NAV_KEYS[i]
                  const active = key !== 'semantix' && activeNav === key
                  const showIndicator = hoveredNav ? hoveredNav === key : active
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-current={active ? 'page' : undefined}
                      onMouseEnter={() => setHoveredNav(key)}
                      onMouseLeave={() => setHoveredNav(null)}
                      onClick={() => {
                        if (key === 'home') {
                          setActiveNav('home')
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        if (key === 'semantix') {
                          window.location.href = SEMANTIX_URL
                        }
                        if (key === 'baoduile') {
                          setActiveNav('baoduile')
                          section2Ref.current?.scrollIntoView({ behavior: 'smooth' })
                        }
                        if (key === 'baoshu') {
                          setActiveNav('baoshu')
                          section3Ref.current?.scrollIntoView({ behavior: 'smooth' })
                        }
                        if (key === 'shrimper') {
                          setActiveNav('shrimper')
                          section4Ref.current?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className={`group relative -mx-1 flex h-8 items-center whitespace-nowrap px-1 text-[13px] font-normal transition-[color,transform] duration-200 focus-visible:text-white focus-visible:outline-none ${
                        active ? 'text-white' : 'text-white/65 hover:-translate-y-px hover:text-white'
                      }`}
                    >
                      {label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-1 bottom-0 h-px origin-left bg-[#c8e6d9] transition-transform duration-300 ease-out ${
                          showIndicator ? 'scale-x-100' : 'scale-x-0 group-focus-visible:scale-x-100'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>

              {/* 公司入口：关于我们 + 联系我们 */}
              <div className="flex items-center gap-2.5 border-l border-white/15 pl-5 xl:pl-6">
                <a
                  href="/about"
                  className="rounded-full border border-white/30 px-4 py-2 text-[13px] font-medium text-white/85 transition hover:border-white/60 hover:bg-white/5 hover:text-white"
                >
                  {t.navAbout}
                </a>
                <a
                  href="/contact"
                  className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#1e1f1f] transition hover:bg-[#ddf6ee]"
                >
                  {t.navContact}
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero 区：左标语 — 中视觉轮播（扫描保单 ⇄ Harness 编排） */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* 左：品牌标语（英文更长，收窄宽度并允许换行，避免被中部轮播挡住） */}
          <div
            className={`absolute left-6 top-1/2 z-10 -translate-y-1/2 text-left lg:left-10 ${
              locale === 'en' ? 'w-[min(17rem,28vw)] max-w-[17rem]' : 'max-w-sm'
            }`}
          >
            <p className="text-[0.65rem] tracking-[0.3em] text-white/60 uppercase">{t.heroTag}</p>
            <h2
              className={`mt-3 font-black tracking-tight text-white ${
                locale === 'en'
                  ? 'text-[1.85rem] leading-[1.08] md:text-4xl xl:text-[2.75rem]'
                  : 'whitespace-nowrap text-5xl leading-none md:text-6xl'
              }`}
            >
              {t.heroTitle1}
              <br />
              <span className="text-[#c8e6d9]">{t.heroTitle2}</span>
            </h2>
            <p
              className={`mt-4 font-medium uppercase tracking-[0.28em] text-[#c8e6d9] ${
                locale === 'en' ? 'text-[0.6rem] leading-relaxed' : 'text-[0.65rem] leading-relaxed'
              }`}
            >
              {t.heroDesc1}
              <br />
              {t.heroDesc2}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => productMapRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1e1f1f] transition hover:bg-white/90"
              >
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
              <div className="font-brand whitespace-nowrap text-5xl font-black leading-none tracking-tight text-white md:text-6xl">
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
              <div className="font-brand whitespace-nowrap text-5xl font-black leading-none tracking-tight text-white md:text-6xl">
                HARNESS
              </div>
              <div className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#c8e6d9]">
                {t.harnessSlogan}
              </div>
            </div>
          )}

          {/* 右：Semantix 态大字 */}
          {carouselIndex === 2 && (
            <div className="slide-in-right pointer-events-none absolute right-10 top-1/2 hidden max-w-sm -translate-y-1/2 text-right md:block">
              <div className="font-brand whitespace-nowrap text-5xl font-black leading-none tracking-tight text-white md:text-6xl">
                SEMANTIX
              </div>
              <div className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#c8e6d9]">
                {t.semantixSlogan}
              </div>
            </div>
          )}
        </div>

        {/* 底部中央：向下滚动提示箭头——先进入产品地图 */}
        <button
          onClick={() => productMapRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          aria-label={t.langLabel === 'EN' ? 'Scroll to product map' : '滚动到产品地图'}
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

      {/* 产品地图：两端产品，一套底座 */}
      <div ref={productMapRef}>
        <ProductSystem
          onBaoduile={() => section2Ref.current?.scrollIntoView({ behavior: 'smooth' })}
          onBaoshu={() => section3Ref.current?.scrollIntoView({ behavior: 'smooth' })}
          onShrimper={() => section4Ref.current?.scrollIntoView({ behavior: 'smooth' })}
          onSemantix={() => {
            window.location.href = SEMANTIX_URL
          }}
        />
      </div>

      {/* 第二屏：产品 01 — 保对了（智能投保）——左侧视频 demo + 右侧内容 */}
      <section ref={section2Ref} className="relative z-20 flex min-h-svh flex-col items-center justify-center px-8 py-24">
        {/* 左：视频 demo（滑入本屏才播放，进度联动下方步骤框） */}
        <div ref={videoBoxRef} className="absolute left-24 top-[38%] w-[880px] max-w-[calc(100vw-560px)] -translate-y-1/2">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/50 shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
            <video
              ref={demoVideoRef}
              src="/demo.mp4"
              loop
              muted
              playsInline
              onLoadedMetadata={handleVideoLoaded}
              onTimeUpdate={handleVideoTime}
              className="aspect-video w-full object-cover"
            />
            {/* 快进/快退过渡中的加速 logo */}
            {ffActive && (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex items-center gap-3 rounded-full border border-[#c8e6d9]/40 bg-black/70 px-7 py-3.5 backdrop-blur-md">
                  {ffActive === 'forward' ? (
                    <FastForward className="h-7 w-7 text-[#c8e6d9]" />
                  ) : (
                    <Rewind className="h-7 w-7 text-[#c8e6d9]" />
                  )}
                  <span className="text-sm font-bold tracking-[0.25em] text-[#c8e6d9]">
                    {ffActive === 'forward' ? '快进中' : '回退中'}
                  </span>
                </div>
              </div>
            )}
            {/* 正在讲解标注：点击跳转/播放联动时明确反馈 */}
            {activeStep >= 0 && (
              <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full border border-[#c8e6d9]/50 bg-[#121414]/85 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c8e6d9]" />
                <span className="text-[0.65rem] font-medium tracking-[0.15em] text-[#c8e6d9]">
                  正在讲解 · {FLOW_STEPS[activeStep].num} {FLOW_STEPS[activeStep].title}
                </span>
              </div>
            )}
            {/* 视频顶部大段名水印：一眼看清当前讲解段落 */}
            {activeStep >= 0 && activeStep < 4 && (
              <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-[#c8e6d9]/40 bg-black/60 px-6 py-2.5 backdrop-blur-md">
                <span className="text-lg font-bold tracking-[0.2em] text-[#c8e6d9]">
                  {FLOW_STEPS[activeStep].num} · {FLOW_STEPS[activeStep].title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 视频 → 激活步骤框连线（薄荷绿虚线 + 流动光点） */}
        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
          {lineCoords && (
            <g>
              <line
                x1={lineCoords.x1}
                y1={lineCoords.y1}
                x2={lineCoords.x2}
                y2={lineCoords.y2}
                stroke="#c8e6d9"
                strokeWidth="1.5"
                strokeDasharray="7 7"
                opacity="0.65"
              />
              <circle cx={lineCoords.x2} cy={lineCoords.y2} r="4" fill="#c8e6d9" />
            </g>
          )}
        </svg>

        {/* 右：内容块（上移） */}
        <div className="absolute right-16 top-[38%] w-[400px] -translate-y-1/2 text-left">
          <p className="font-mono text-[10px] tracking-[0.24em] text-[#c8e6d9]/80">C 端 · 家庭个人</p>
          <h2
            className="mt-3 whitespace-nowrap text-5xl font-black font-brand leading-none tracking-tight text-white md:text-6xl"
          >
            保对了
          </h2>
          <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">
            看懂自己的保单，
            <br />
            看清家庭的保障
          </h3>
          <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] leading-relaxed text-[#c8e6d9]">
            面向家庭与个人
            <br />
            无需面对销售压力，看懂保单、看清缺口、
            <br />
            获得专业类目级规划建议。
          </p>
          <p className="mt-5 text-sm leading-relaxed text-white/55">
            同一产品也覆盖企业端：创业公司可做经营风险体检，看清用工、出海与数据合规缺口。
          </p>
          <button
            type="button"
            onClick={() => {
              window.location.href = BAODUILE_URL
            }}
            className="mt-8 rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            了解更多
          </button>
        </div>

        {/* 底部：5 步流程（点击跳转到视频对应段） */}
        <div className="absolute inset-x-10 bottom-2">
          <div className="flex items-stretch justify-center gap-10">
            {FLOW_STEPS.map((s, i) => (
              <div
                key={s.num}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                onClick={() => {
                  const v = demoVideoRef.current
                  if (!v) return
                  const target = SEG_BOUNDS[i]
                  cancelAnimationFrame(ffRafRef.current)
                  ffRafRef.current = 0
                  if (v.currentTime < target) {
                    // 目标在前：16x 快进过渡过去（浏览器最大支持）
                    ffTargetRef.current = target
                    setFFActive('forward')
                    v.playbackRate = 16
                    v.play().catch(() => {})
                  } else if (v.currentTime > target) {
                    // 目标在后：rAF 模拟快退过渡
                    ffTargetRef.current = null
                    setFFActive('backward')
                    v.pause()
                    const step = 0.27 // 每帧约回退 0.27s（≈16x 快退）
                    const tick = () => {
                      if (v.currentTime - step <= target) {
                        v.currentTime = target
                        setActiveStep(i)
                        v.playbackRate = SEG_RATES[i]
                        setFFActive(null)
                        v.play().catch(() => {})
                        return
                      }
                      v.currentTime -= step
                      ffRafRef.current = requestAnimationFrame(tick)
                    }
                    ffRafRef.current = requestAnimationFrame(tick)
                  }
                }}
                className={`relative w-52 cursor-pointer rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300 ${
                  activeStep === i && i < 4
                    ? '-translate-y-1.5 border-[#c8e6d9] bg-[#1d2b26]/95'
                    : 'border-white/15 bg-[#121414]/80 hover:-translate-y-1 hover:border-[#c8e6d9]/50 hover:bg-[#161c1a]/90'
                }`}
                style={{
                  boxShadow: '0 14px 36px rgba(0,0,0,0.28)',
                }}
              >
                {/* 顶部连线（视频讲解到对应步骤时亮起；端点圆由 SVG 连线提供，避免双绿圈） */}
                <span
                  className={`absolute -top-4 left-1/2 h-4 w-px -translate-x-1/2 bg-[#c8e6d9] transition-opacity duration-300 ${
                    activeStep === i && i < 4 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <p className="text-sm font-semibold tracking-[0.2em] text-[#c8e6d9]">{s.num}</p>
                <h3 className="mt-3 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/95">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 保对了 · B 端：企业风险体检（来自 baoduile /business） */}
      <section className="relative z-20 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] tracking-[0.28em] text-[#c8e6d9]">BAODUILE · BUSINESS</p>
              <h3 className="mt-4 font-brand text-3xl font-black tracking-tight text-white md:text-5xl">
                企业风险体检
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                为创业公司与经营团队提供保障缺口判断：先选身份进入企业端，采集公司画像，生成可交互的风险热力图报告——不荐品、不施压，只把缺口说清楚。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.16em] text-[#c8e6d9]/85">
              <span className="border border-[#c8e6d9]/30 px-3 py-1.5">劳动用工</span>
              <span className="border border-[#c8e6d9]/30 px-3 py-1.5">出海合同</span>
              <span className="border border-[#c8e6d9]/30 px-3 py-1.5">数据合规</span>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="border border-white/12 bg-white/[0.03] px-5 py-6">
              <Building2 className="h-5 w-5 text-[#c8e6d9]" strokeWidth={1.5} />
              <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[#c8e6d9]/70">01 · PROFILE</p>
              <h4 className="mt-2 font-brand text-xl font-black text-white">企业画像采集</h4>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                联系人档案 → 公司基本盘 → 三条需求线，结构化看清经营与保障现状。
              </p>
            </div>
            <div className="border border-white/12 bg-white/[0.03] px-5 py-6">
              <FileSearch className="h-5 w-5 text-[#c8e6d9]" strokeWidth={1.5} />
              <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[#c8e6d9]/70">02 · PREVIEW</p>
              <h4 className="mt-2 font-brand text-xl font-black text-white">确定性缺口预诊</h4>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                先给确定性缺口预览，可继续深挖补全，再决定是否领取完整报告。
              </p>
            </div>
            <div className="border border-white/12 bg-white/[0.03] px-5 py-6">
              <Flame className="h-5 w-5 text-[#c8e6d9]" strokeWidth={1.5} />
              <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[#c8e6d9]/70">03 · HEATMAP</p>
              <h4 className="mt-2 font-brand text-xl font-black text-white">风险热力图报告</h4>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                流式生成可交互保障体检报告，边生成边看，覆盖经营风险与保障缺口。
              </p>
            </div>
            <div className="border border-white/12 bg-white/[0.03] px-5 py-6">
              <MessageSquare className="h-5 w-5 text-[#c8e6d9]" strokeWidth={1.5} />
              <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[#c8e6d9]/70">04 · HANDOFF</p>
              <h4 className="mt-2 font-brand text-xl font-black text-white">转保叔继续深聊</h4>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                报告页可带着体检上下文进入对话，针对单条风险线继续追问与解读。
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-white/45">
              路径：选择「为公司保障」→ 填写企业画像 → 领取完整体检报告 / 继续深挖 → 风险热力图 → 可选对接保叔解读。
            </p>
            <p className="shrink-0 font-mono text-[10px] tracking-[0.18em] text-[#c8e6d9]/70">
              /business/checkup
            </p>
          </div>
        </div>
      </section>

      {/* 第三屏：产品 02 — 保叔：左右布局（左标题 / 右核心能力卡，间距小、卡片按内容有长有短） */}
      <section ref={section3Ref} className="relative z-20 flex min-h-svh flex-col items-center justify-center px-8">
        {/* 左：保叔标题 + 描述 + CTA */}
        <div className="absolute left-24 top-1/2 w-[430px] -translate-y-1/2 text-left">
          <h2 className="font-brand text-5xl font-black leading-none tracking-tight text-white md:text-6xl">
            保叔
          </h2>
          <p className="mt-4 font-brand text-2xl font-bold leading-snug tracking-tight text-white/90 md:text-3xl">
            飞书里的 AI 同事
            <br />
            一个顶一支助理团队
          </p>
          <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#c8e6d9]">
            内容 · 获客 · 方案 · 保单管理
          </p>
          <button className="mt-8 rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            了解更多
          </button>
        </div>

        {/* 右：核心能力砖墙。每一行独立展开，标题直接说明与保叔的归属关系。 */}
        <div className="absolute left-[575px] top-1/2 w-[830px] -translate-y-1/2">
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.3em]">
            <span className="text-[#c8e6d9]">保叔</span>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-[#c8e6d9]/75">核心能力</span>
          </p>
          <div className="relative mt-2 flex flex-col gap-2">
            <span
              className="pointer-events-none absolute -left-[1.25rem] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#c8e6d9]/35 to-transparent"
              aria-hidden="true"
            />
            {BRICK_ROWS.map((row, rowIndex) => {
              const expandedInRow = row.some((brick) => brick.num === expandedBrick)
              return (
                <div
                  key={rowIndex}
                  className="relative flex items-start motion-reduce:!transition-none"
                  style={{
                    gap: expandedInRow ? '0px' : '8px',
                    transition: 'gap 900ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span
                    className="pointer-events-none absolute -left-[1.4rem] top-1/2 flex w-[1.4rem] -translate-y-1/2 items-center"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 border border-[#c8e6d9]/55 bg-[#1e1f1f]" />
                    <span className="h-px flex-1 bg-[#c8e6d9]/35" />
                  </span>
                  {row.map((f) => {
                    const isExpanded = expandedBrick === f.num
                    const isSiblingHidden = expandedInRow && !isExpanded
                    const flexWeight = f.span === 'col-span-4' ? 4 : f.span === 'col-span-3' ? 3 : 2
                    const restingHeight = bricksGrown && f.tall ? 150 : 104

                    return (
                      <button
                        key={f.num}
                        type="button"
                        onClick={() => setExpandedBrick(isExpanded ? null : f.num)}
                        aria-expanded={isExpanded}
                        aria-hidden={isSiblingHidden}
                        tabIndex={isSiblingHidden ? -1 : 0}
                        className={`min-w-0 overflow-hidden rounded-xl text-left backdrop-blur-sm motion-reduce:!transition-none ${
                          isExpanded
                            ? 'border border-[#c8e6d9]/60 bg-[#161c1a]/95 px-6 py-5'
                            : isSiblingHidden
                              ? 'pointer-events-none border border-transparent px-0 py-0'
                              : 'cursor-pointer border border-white/15 bg-[#121414]/80 px-4 py-3 hover:-translate-y-0.5 hover:border-[#c8e6d9]/50 hover:bg-[#161c1a]/90'
                        }`}
                        style={{
                          flexGrow: expandedInRow ? (isExpanded ? 1 : 0) : flexWeight,
                          flexBasis: expandedInRow ? (isExpanded ? '100%' : '0%') : '0%',
                          height: isExpanded ? 220 : restingHeight,
                          opacity: isSiblingHidden ? 0 : 1,
                          transform: isSiblingHidden ? 'scale(0.96)' : 'scale(1)',
                          transition:
                            'flex-grow 900ms cubic-bezier(0.16, 1, 0.3, 1), flex-basis 900ms cubic-bezier(0.16, 1, 0.3, 1), height 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 420ms ease, transform 700ms cubic-bezier(0.16, 1, 0.3, 1), padding 700ms cubic-bezier(0.16, 1, 0.3, 1), border-color 420ms ease, background-color 420ms ease',
                        }}
                      >
                        <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#c8e6d9]/75">
                          {f.num}/{f.en}
                        </p>
                        <h3 className={`${isExpanded ? 'mt-2 text-2xl' : 'mt-1 text-[15px]'} font-brand font-bold text-white/90`}>
                          {f.title}
                        </h3>
                        <p className={`${isExpanded ? 'mt-1.5 text-sm' : 'mt-0.5 text-xs'} font-brand font-bold leading-relaxed text-[#c8e6d9]/70`}>
                          {f.desc}
                        </p>
                        <div
                          aria-hidden={!isExpanded}
                          className={`overflow-hidden transition-all duration-700 motion-reduce:transition-none ${
                            isExpanded ? 'mt-4 max-h-32 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <p className="max-w-3xl font-brand text-[15px] font-bold leading-relaxed text-white/70">{f.detail}</p>
                          <p className="mt-3 font-mono text-[0.65rem] tracking-[0.15em] text-[#c8e6d9]/50">点击收起</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 第四屏：Shrimper — 技术底座 / N×N Agent 平台 */}
      <section ref={section4Ref} className="relative z-20 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] tracking-[0.28em] text-[#c8e6d9]">TECHNICAL FOUNDATION</p>
            <h2 className="mt-4 font-brand text-4xl font-black tracking-tight text-white md:text-6xl">
              Shrimper
            </h2>
            <p className="mt-3 font-brand text-xl font-bold text-[#c8e6d9] md:text-2xl">
              技术底座 · 自研 N×N Agent 平台
            </p>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/65">
              支撑确石全线产品。从「个人能用」到「企业能用」，中间隔着的不是简单扩容，而是一整套重新设计的运行时架构。
            </p>
          </div>

          <div className="mt-12 grid gap-8 border border-white/12 bg-white/[0.03] px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-10">
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-[#c8e6d9]/80">WHY SHRIMPER</p>
              <h3 className="mt-4 font-brand text-2xl font-black tracking-tight text-white md:text-3xl">
                为什么需要
                <br />
                Shrimper
              </h3>
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-white/65">
              <p>
                当下全球最强的开源 AI Agent 引擎，几乎都是为个人开发者设计的 —— 一个人、一个 Agent、一个进程。
              </p>
              <p>
                但真实的企业场景是 <span className="font-semibold text-[#c8e6d9]">N×N</span> 的：N 个用户、N 种角色、N 个渠道、N 种业务流程。
              </p>
              <p className="text-white/80">
                Shrimper 就是确石智能对这一问题的系统化答案。
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-5 flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#c8e6d9]/80">TECHNICAL CAPABILITIES</span>
              <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-white/35">技术能力</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-white/12 bg-white/[0.03] px-5 py-6">
                <Network className="h-5 w-5 text-[#c8e6d9]" strokeWidth={1.5} />
                <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[#c8e6d9]/70">01 · MULTI-TENANT</p>
                <h3 className="mt-2 font-brand text-xl font-black text-white">多租户运行时</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  基于分布式任务队列的多用户并发架构，支持大量用户同时使用、互不干扰。用户级数据严格隔离，商业敏感信息绝不交叉泄露。
                </p>
              </div>
              <div className="border border-white/12 bg-white/[0.03] px-5 py-6">
                <FileSearch className="h-5 w-5 text-[#c8e6d9]" strokeWidth={1.5} />
                <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[#c8e6d9]/70">02 · PER-USER MEMORY</p>
                <h3 className="mt-2 font-brand text-xl font-black text-white">Per-user 动态档案</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  每位用户拥有专属的、随交互演化的 AI 上下文。Agent 越用越懂你，而不是每次对话都重置。
                </p>
              </div>
              <div className="border border-white/12 bg-white/[0.03] px-5 py-6">
                <Flame className="h-5 w-5 text-[#c8e6d9]" strokeWidth={1.5} />
                <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[#c8e6d9]/70">03 · PROACTIVE PUSH</p>
                <h3 className="mt-2 font-brand text-xl font-black text-white">主动推送能力</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  AI 不只被动响应，可基于时间、事件、状态主动发起对话 —— 定期提醒、异常报警、跟进推送，让 Agent 真正具备「同事感」。
                </p>
              </div>
              <div className="border border-white/12 bg-white/[0.03] px-5 py-6">
                <Scale className="h-5 w-5 text-[#c8e6d9]" strokeWidth={1.5} />
                <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-[#c8e6d9]/70">04 · ENGINE ABSTRACTION</p>
                <h3 className="mt-2 font-brand text-xl font-black text-white">引擎抽象与可演进</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  Shrimper 与底层 AI 引擎解耦。无论 Agent 引擎如何演进，确石的产品都能持续受益于最新的技术能力。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-10">
            <p className="font-mono text-[10px] tracking-[0.24em] text-[#c8e6d9]/80">VALUE</p>
            <h3 className="mt-4 max-w-3xl font-brand text-2xl font-black tracking-tight text-white md:text-3xl">
              Shrimper 带来的价值
            </h3>
            <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-white/65">
              对客户而言，Shrimper 意味着确石的产品具备真正的企业级品质 —— 不是 Demo，不是玩具，而是可以承载真实业务、扛得住真实流量的生产级系统。这是保叔能稳定服务大量保险经纪人的根本原因。
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
