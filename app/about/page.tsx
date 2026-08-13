import type { Metadata } from 'next'
import { InfoCard, InfoDl, InfoHeading, InfoLink, InfoPageShell } from '@/components/info-page-shell'

export const metadata: Metadata = {
  title: '关于我们 | 确石智能 Ensure.AI',
  description:
    '确石智能是一家 AI Native 科技公司。从金融保险出发，打造保叔、保对了，以及 Shrimper / Semantix 技术底座，让行业用户真正拥有可用的 AI 同事。',
}

export default function AboutPage() {
  return (
    <InfoPageShell title="关于我们" updatedAt="2026-08-12">
      <p>
        确石智能（Ensure.AI）是一家 AI Native 科技公司。我们相信 AI Agent 是这一代最重要的技术变革，但它的价值不应只属于技术极客。
      </p>
      <p>
        我们的使命，是把最强的 AI 能力做成行业用户真正能上手、能信赖、能创造价值的产品——让每一个行业，都拥有属于自己的 AI 同事。
      </p>

      <InfoHeading>从金融保险出发</InfoHeading>
      <p>
        我们同时服务保险顾问与经纪人（B 端）以及有保障需求的家庭用户（C 端），让复杂、专业、信息不对称的保险服务变得更简单、更透明、更可靠。
      </p>
      <p>
        只有先在一个行业里做出「真正能用」的产品，才能把同样的能力带到千行百业。
      </p>

      <InfoHeading>我们如何做事</InfoHeading>
      <ul className="list-disc space-y-3 pl-5">
        <li>
          <strong className="text-white">行业内置，不是套壳</strong>
          <br />
          <span className="text-white/70">内置保险专业知识、合规边界与真实工作流，而不是给通用大模型包一层界面。</span>
        </li>
        <li>
          <strong className="text-white">主动而非被动</strong>
          <br />
          <span className="text-white/70">Agent 会提醒、跟进、推送洞察，像一位会干活的同事，而不是只会等你提问的工具。</span>
        </li>
        <li>
          <strong className="text-white">从个人能用到企业能用</strong>
          <br />
          <span className="text-white/70">面向多用户、多角色、多渠道的真实业务场景，打造可承载生产流量的系统能力。</span>
        </li>
      </ul>

      <InfoHeading>产品与底座</InfoHeading>
      <ul className="list-disc space-y-3 pl-5">
        <li>
          <strong className="text-white">保对了</strong>
          <br />
          <span className="text-white/70">
            家庭保障 AI 助手，也覆盖企业风险体检。上传保单、缺口分析、类目级规划；企业端可看清用工、出海与数据合规风险。
          </span>
        </li>
        <li>
          <strong className="text-white">保叔</strong>
          <br />
          <span className="text-white/70">飞书里的 AI 同事，面向保险顾问：内容、获客、方案与保单管理，嵌进日常工作流。</span>
        </li>
        <li>
          <strong className="text-white">Shrimper</strong>
          <br />
          <span className="text-white/70">自研 N×N Agent 平台，多租户运行时与主动推送能力，支撑全线产品企业级落地。</span>
        </li>
        <li>
          <strong className="text-white">Semantix</strong>
          <br />
          <span className="text-white/70">
            自进化 Agent 优化内核（
            <InfoLink href="https://semantix.ensureok.ai">semantix.ensureok.ai</InfoLink>
            ／
            <InfoLink href="https://github.com/Gnosil/semantix">GitHub</InfoLink>
            ），语义缓存、推理优化与结果复用。
          </span>
        </li>
      </ul>

      <InfoCard>
        <InfoHeading>公司信息</InfoHeading>
        <InfoDl
          rows={[
            { label: '公司全称', value: '上海确石智能科技有限公司' },
            { label: '品牌', value: '确石智能 · Ensure.AI' },
            { label: '公司地址', value: '上海市浦东新区 · 张江人工智能创新小镇' },
            {
              label: '官方网站',
              value: <InfoLink href="https://www.ensureok.ai">www.ensureok.ai</InfoLink>,
            },
          ]}
        />
      </InfoCard>
    </InfoPageShell>
  )
}
