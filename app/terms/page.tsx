import type { Metadata } from 'next'
import { InfoHeading, InfoLink, InfoPageShell } from '@/components/info-page-shell'

export const metadata: Metadata = {
  title: '服务条款 | 确石智能 Ensure.AI',
  description: '确石智能官方网站（www.ensureok.ai）服务条款。',
}

export default function TermsPage() {
  return (
    <InfoPageShell title="服务条款" updatedAt="2026-08-12">
      <InfoHeading>1. 接受条款</InfoHeading>
      <p>
        本服务条款适用于您访问和使用确石智能（上海确石智能科技有限公司，下称「我们」）运营的官方网站{' '}
        <InfoLink href="https://www.ensureok.ai">www.ensureok.ai</InfoLink>
        （下称「本网站」）。访问或使用本网站，即表示您已阅读、理解并同意本条款。
      </p>
      <p>
        您应具有完全民事行为能力。若未满 18 周岁或依法不具有完全民事行为能力，请在监护人陪同下阅读本条款，并经监护人同意后再使用本网站。
      </p>

      <InfoHeading>2. 网站性质</InfoHeading>
      <p>
        本网站用于介绍确石智能的公司、产品（保对了、保叔）与技术底座（Shrimper、Semantix），并提供相关入口链接。网站内容仅供一般性了解，
        <strong className="text-white">不构成</strong>
        投资建议、法律意见或保险产品购买建议。
      </p>
      <p>
        我们可能不时调整网站内容与功能。在法律允许范围内，我们不对网站持续可用或特定功能始终可用作出承诺。
      </p>

      <InfoHeading>3. 使用规范</InfoHeading>
      <p>我们授予您有限、非独占、不可转让的许可，供您个人、非商业地浏览和使用本网站。使用时不得：</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>违反法律法规或本条款；</li>
        <li>逆向工程、反编译或试图获取源代码（开源项目按其许可证执行除外）；</li>
        <li>使用自动化工具批量抓取、频繁请求或干扰网站运行；</li>
        <li>传播恶意代码、病毒或其他损害他人权益的内容；</li>
        <li>冒充他人，或虚假陈述与确石的关系；</li>
        <li>利用本网站侵害我们或第三方合法权益。</li>
      </ul>
      <p>如有违反，我们有权限制访问、暂停或终止服务，并保留追究法律责任的权利。</p>

      <InfoHeading>4. 知识产权</InfoHeading>
      <p>
        本网站文字、图形、标识、界面与演示素材等的权利归确石或相应权利人所有，未经许可不得复制、修改、传播或用于商业用途。
      </p>
      <p>
        开源软件（如 Semantix）同时受其开源许可证约束；使用开源软件时，请一并遵守相应许可证。
      </p>

      <InfoHeading>5. 免责声明</InfoHeading>
      <p>
        本网站内容按「现状」提供。我们不对其准确性、完整性、时效性或适用性作明示或默示保证。保险产品具体条款、责任与风险，以保险合同及持牌机构信息为准。
      </p>
      <p>
        AI 产品（含保对了、保叔等）输出仅供参考，不构成专业意见。作出保险相关决策前，请咨询持牌专业人士。我们对因依赖本网站内容或 AI 输出所作决策不承担责任。
      </p>
      <p>
        在法律允许的最大范围内，因使用或无法使用本网站产生的直接或间接损失，我们概不负责；依法不能排除或限制的责任除外。
      </p>

      <InfoHeading>6. 外部链接</InfoHeading>
      <p>
        本网站可能包含第三方链接（如 GitHub、产品站点）。我们仅为便利提供链接，不对第三方内容、行为与隐私实践负责。访问第三方站点时，请遵守其条款与政策。
      </p>

      <InfoHeading>7. 适用法律与争议解决</InfoHeading>
      <p>
        本条款适用中华人民共和国法律。因本条款或本网站产生的争议，双方应先友好协商；协商不成的，可向上海市有管辖权的人民法院提起诉讼。
      </p>

      <InfoHeading>8. 条款变更</InfoHeading>
      <p>
        我们可能更新本条款，并在本页公布更新日期。重大变更将通过网站显著位置或其他适当方式告知。更新后继续使用本网站，即视为接受更新后的条款。
      </p>

      <InfoHeading>9. 其他</InfoHeading>
      <p>
        本条款任一条款被认定无效或不可执行，不影响其余条款效力。本条款构成您与我们就使用本网站达成的完整约定。
      </p>

      <InfoHeading>10. 联系我们</InfoHeading>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          邮箱：
          <InfoLink href="mailto:junhaihuang@aiqueshi.com">junhaihuang@aiqueshi.com</InfoLink>
        </li>
        <li>公司：上海确石智能科技有限公司</li>
        <li>地址：上海市浦东新区 · 张江人工智能创新小镇</li>
      </ul>
      <p>本条款自发布之日起生效。</p>
    </InfoPageShell>
  )
}
