const XHS_URL =
  'https://www.xiaohongshu.com/user/profile/6883a11a000000000d03f4d3?xhsshare=userQrCode'

export function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-white/10 px-8 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 text-sm text-white/75">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <span>© 2026 确石智能 · Ensure.AI</span>
          <span className="tracking-wide">让最强的 AI 走进千行百业</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4">
          <a href="/about" className="text-white/60 transition hover:text-white">
            关于我们
          </a>
          <a href="/contact" className="text-white/60 transition hover:text-white">
            联系我们
          </a>
          <a href="/privacy" className="text-white/60 transition hover:text-white">
            隐私政策
          </a>
          <a href="/terms" className="text-white/60 transition hover:text-white">
            服务条款
          </a>
          <a
            href={XHS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 transition hover:text-white"
          >
            小红书
          </a>
          <span className="ml-auto text-xs text-white/40">最后更新：2026-08-12</span>
        </div>
      </div>
    </footer>
  )
}
