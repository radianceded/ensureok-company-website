# Interactive Forest Point Cloud

一个基于 Next.js、React Three Fiber 和 Three.js 的交互式粒子森林网站。

## 本地运行

需要 Node.js 20.9 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开 <http://localhost:3000>。

## 验收

```bash
npm run lint
npm run typecheck
npm run build
```

## 项目结构

- `app/`：页面、布局和全局样式
- `components/particle-forest/`：粒子森林、交互逻辑和 GLSL 着色器
- `components/`：首页轮播及演示面板
- `public/`：Logo、图标和占位资源

此源码包已移除 `node_modules`、`.next`、macOS 元数据和重复的 pnpm 锁文件。依赖以 `package-lock.json` 为准。

## 团队协作

开发前请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)。新功能和缺陷先建立 Issue，再通过独立分支与 Pull Request 合并。
