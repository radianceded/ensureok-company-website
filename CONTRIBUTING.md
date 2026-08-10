# 协作指南

## 开始开发

1. 从最新的 `main` 创建分支。
2. 一个分支只处理一个 Issue。
3. 提交前完成本地验收。
4. 通过 Pull Request 合并，避免直接向 `main` 推送功能代码。

```bash
git switch main
git pull --ff-only
git switch -c feat/issue-number-short-name
npm ci
npm run dev
```

## 分支与提交

分支使用 `feat/`、`fix/`、`docs/` 或 `chore/` 前缀，例如：

```text
feat/12-mobile-particle-budget
fix/18-reduced-motion
```

提交信息使用简短的动词开头，并说明实际改动，例如：

```text
feat: add mobile particle budget
fix: stop animation for reduced motion
```

## Pull Request

- 在描述中关联 Issue，例如 `Closes #12`。
- 说明改动、原因、验收方式和视觉影响。
- UI 改动附桌面端与移动端截图。
- 保持 PR 小而聚焦；需要不同评审目标时拆分 PR。

## 本地验收

```bash
npm run lint
npm run typecheck
npm run build
```

三项全部通过后再请求评审。
