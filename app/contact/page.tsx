import type { Metadata } from 'next'
import Image from 'next/image'
import { InfoCard, InfoDl, InfoLink, InfoPageShell } from '@/components/info-page-shell'

export const metadata: Metadata = {
  title: '联系我们 | 确石智能 Ensure.AI',
  description: '欢迎与确石智能联系：保险顾问、经纪公司、家庭用户与合作伙伴。',
}

const audiences = ['保险顾问', '经纪公司', '家庭用户', '合作伙伴'] as const

const XHS_URL =
  'https://www.xiaohongshu.com/user/profile/6883a11a000000000d03f4d3?xhsshare=userQrCode'

export default function ContactPage() {
  return (
    <InfoPageShell title="联系我们" updatedAt="2026-08-12">
      <p>
        无论您是希望提升效率的保险顾问、希望升级团队能力的经纪公司、想看懂保障的家庭用户，还是对 AI Native
        保险服务感兴趣的合作伙伴——欢迎联系确石。
      </p>

      <div className="flex flex-wrap gap-2.5">
        {audiences.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#c8e6d9]/35 bg-[#c8e6d9]/10 px-4 py-1.5 text-sm text-[#e7f6ee]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <InfoCard>
          <InfoDl
            rows={[
              { label: '公司全称', value: '上海确石智能科技有限公司' },
              { label: '品牌', value: '确石智能 · Ensure.AI' },
              { label: '公司地址', value: '上海市浦东新区 · 张江人工智能创新小镇' },
              {
                label: '联系邮箱',
                value: (
                  <InfoLink href="mailto:junhaihuang@aiqueshi.com">junhaihuang@aiqueshi.com</InfoLink>
                ),
              },
              {
                label: '官方网站',
                value: <InfoLink href="https://www.ensureok.ai">www.ensureok.ai</InfoLink>,
              },
              {
                label: '小红书',
                value: <InfoLink href={XHS_URL}>确石智能官方账号</InfoLink>,
              },
            ]}
          />
        </InfoCard>

        <a
          href={XHS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 rounded-2xl border border-white/12 bg-black/30 px-5 py-5 transition hover:border-[#c8e6d9]/40"
        >
          <Image
            src="/xiaohongshu-qr.png"
            alt="确石智能小红书账号二维码"
            width={148}
            height={148}
            className="rounded-lg bg-white p-2"
          />
          <span className="text-center text-sm text-white/70">
            扫码关注小红书
            <br />
            <span className="text-xs text-white/45">或点击打开主页</span>
          </span>
        </a>
      </div>

      <p className="text-sm text-white/55">
        商务咨询、产品合作或媒体沟通，请发送邮件至上述邮箱。我们通常会在 1–3 个工作日内回复。
      </p>
    </InfoPageShell>
  )
}
