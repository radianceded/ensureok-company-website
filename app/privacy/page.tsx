import type { Metadata } from 'next'
import { InfoHeading, InfoLink, InfoPageShell } from '@/components/info-page-shell'

export const metadata: Metadata = {
  title: '隐私政策 | 确石智能 Ensure.AI',
  description: '确石智能官方网站（www.ensureok.ai）隐私政策。',
}

export default function PrivacyPage() {
  return (
    <InfoPageShell title="隐私政策" updatedAt="2026-08-12">
      <p>
        本隐私政策适用于确石智能（上海确石智能科技有限公司，下称「我们」）运营的官方网站{' '}
        <InfoLink href="https://www.ensureok.ai">www.ensureok.ai</InfoLink>
        （下称「本网站」）。我们重视您的隐私，并依据《个人信息保护法》《数据安全法》《网络安全法》及相关法律法规处理个人信息。
      </p>
      <p className="text-white/65">
        除另有说明外，「个人信息」「敏感个人信息」采用上述法律定义。本政策仅适用于本官网展示站；确石其他产品（如保对了、保叔）如有独立隐私说明，以其页面为准。
      </p>

      <InfoHeading>1. 我们收集哪些信息</InfoHeading>
      <p>本网站以静态展示为主。浏览本站通常无需注册、登录，也无需主动填写个人信息。</p>
      <p>我们可能处理的信息包括：</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-white">自动收集的访问统计</strong>
          ：通过分析服务收集去标识化访问数据（如访问时间、页面路径、设备类型、浏览器与大致地区），用于改进网站内容。该类信息不直接识别您的身份。
        </li>
        <li>
          <strong className="text-white">您主动提供的信息</strong>
          ：当您通过邮件联系我们时，我们会收到您的联系方式与沟通内容，仅用于回复咨询。
        </li>
      </ul>
      <p>除此之外，我们不会主动收集姓名、证件号码等个人信息，也不会要求您提供敏感个人信息。</p>

      <InfoHeading>2. Cookie 与本地存储</InfoHeading>
      <p>
        本网站可能使用必要的 Cookie 或本地存储以维持基本功能（如语言偏好）。分析服务也可能使用 Cookie 或类似技术进行访问统计。您可在浏览器中管理、拒绝或清除 Cookie；拒绝必要 Cookie 可能影响部分功能。
      </p>

      <InfoHeading>3. 我们如何使用信息</InfoHeading>
      <ul className="list-disc space-y-2 pl-5">
        <li>提供、维护与改进本网站；</li>
        <li>回复您的咨询并与您沟通；</li>
        <li>进行去标识化访问统计与体验分析；</li>
        <li>履行法定义务，或为保护您、我们或第三方重大合法权益所必需。</li>
      </ul>
      <p>我们不会出售您的个人信息，也不会将信息用于与上述目的无关的用途。如需用于其他目的，将另行征得您的同意。</p>

      <InfoHeading>4. 共享与披露</InfoHeading>
      <p>我们不会向第三方出售、出租或交易您的个人信息。仅在以下情形可能共享或披露：</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>事先获得您的明确同意或授权；</li>
        <li>向已签署保密义务的托管、分析等服务商提供实现本政策目的所必需的信息；</li>
        <li>应法律法规、司法或行政机关要求；</li>
        <li>为维护您或他人生命、财产等重大合法权益所必需；</li>
        <li>
          公司发生合并、分立、收购等情形需转移个人信息时，我们将告知接收方信息，并要求其继续受本政策约束。
        </li>
      </ul>

      <InfoHeading>5. 存储与安全</InfoHeading>
      <p>
        个人信息原则上存储于中华人民共和国境内，并仅在实现本政策目的所必需的期限内保留。邮件沟通内容将在咨询处理完毕后于合理期限内删除或匿名化，法律法规另有规定的除外。
      </p>
      <p>
        我们采取合理技术与管理措施保护信息安全（如 HTTPS、权限控制等）。请理解互联网环境无法保证绝对安全，请您妥善保护自行提供的信息。
      </p>

      <InfoHeading>6. 未成年人保护</InfoHeading>
      <p>
        本网站面向成年人，不主动收集未成年人个人信息。未成年人请在监护人指导下使用本站；如监护人发现未成年人向我们提供了个人信息，请联系我们，我们将在核实后及时删除。
      </p>

      <InfoHeading>7. 您的权利</InfoHeading>
      <p>依据相关法律，您可以：</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>查询、复制、更正或补充个人信息；</li>
        <li>请求删除个人信息；</li>
        <li>撤回此前作出的同意（不影响撤回前基于同意已进行的处理）；</li>
        <li>要求我们解释本政策的处理规则；</li>
        <li>向有关主管部门投诉、举报。</li>
      </ul>
      <p>行使上述权利时，请通过下方方式联系我们。我们将在核实身份后，通常于 15 个工作日内处理。</p>

      <InfoHeading>8. 第三方链接</InfoHeading>
      <p>
        本网站可能包含指向第三方网站（如 GitHub、产品站点）的链接。第三方的隐私实践不受本政策约束，请您自行阅读其隐私政策。
      </p>

      <InfoHeading>9. 政策更新</InfoHeading>
      <p>
        我们可能因法律法规、业务或技术变化更新本政策，并在本页更新日期。重大变更将通过网站显著位置或其他适当方式告知。
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
      <p>本政策自发布之日起生效。</p>
    </InfoPageShell>
  )
}
