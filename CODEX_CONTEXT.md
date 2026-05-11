# MakeFlow Frontend Productization Context

## Purpose

This repository is a LangFlow fork being productized as **MakeFlow**.
The target product is a customer-installed, enterprise SaaS-style **no-code AI agent builder**.

The user-facing experience must make MakeFlow feel like a distinct product solution, not a lightly renamed LangFlow instance. The first implementation phase is limited to frontend UI productization.

## Product Positioning

MakeFlow should be presented as:

- A no-code AI Agent builder.
- A customer-installed enterprise solution.
- A workflow/agent authoring product for business users and technical operators.
- A Korean-first product, with English keywords retained where Korean labels would feel awkward.

Preferred product language:

- Product name: `MakeFlow`
- `Flows` -> `Workflows`
- `Components` -> `Blocks`
- `Playground` -> `Test Run`
- `Store` -> `Template Hub`
- `Community` -> remove from customer-facing UI
- `API Keys` -> `Access Keys`
- `Deployments` -> Korean `배포` or English `Publish`, depending on surrounding UI
- `Knowledge` -> `Knowledge Base`
- `Agent` may stay in English
- Explanatory copy should be mostly Korean

## Scope For Phase 1

Phase 1 is frontend-only MakeFlow productization.

In scope:

- Frontend visible branding.
- Logo, favicon, browser title, and app title.
- Login, signup, empty states, settings, header, modals, chat/playground surfaces.
- User-facing strings and locale text.
- Community/Open Source promotional UI removal.
- `Store` repackaged as `Template Hub`.
- MakeFlow-only template presentation.
- Enterprise SaaS look and feel.

Out of scope for Phase 1:

- Python package/module rename from `langflow` to `makeflow`.
- Backend import path changes.
- CLI command rename.
- Docker image rename.
- Database schema changes.
- API route changes.
- Deep package metadata changes unless they are directly visible in the frontend.

Internal source paths and imports may still contain `langflow` during Phase 1. Customer-facing UI must not.

## Legal And Attribution Handling

Do not remove repository-level license obligations.

Customer-facing application screens should not display LangFlow branding, Discord/GitHub community prompts, or open-source promotional content. License/notice handling should remain at repository or distribution-document level, such as `LICENSE` and a future `NOTICE` file if required.

Do not delete `LICENSE`.

## Customer-Facing Removal Targets

Remove or replace these from visible UI:

- `LangFlow`, `Langflow`, `langflow` when shown to users.
- Discord links, icons, counts, or community prompts.
- GitHub repository links, star counts, or "star us" prompts.
- Twitter/X and YouTube links.
- LangFlow Desktop links.
- LangFlow docs links.
- `Built with Langflow`.
- `Langflow Store`.
- "Report on Discord or GitHub" copy.
- Any "community-shared" language.

Acceptable internal leftovers:

- Import paths such as `@/assets/LangflowLogo.svg?react` only temporarily while being replaced.
- Backend module paths under `src/backend/base/langflow`.
- Package names and tests that are not customer-facing.

## Template Hub Direction

The old Store/Community experience should become **Template Hub**.

Template Hub should feel like a curated MakeFlow product feature, not a community marketplace.

Suggested template categories:

- Customer Support Agent
- Internal Knowledge Q&A Agent
- Lead Qualification Agent
- Meeting Summary Agent
- Contract Review Agent
- Report Automation Agent
- FAQ Response Agent
- Data Analysis Assistant

Frontend copy examples:

- `Template Hub에서 Agent 템플릿을 선택해 빠르게 시작하세요.`
- `업무 목적에 맞는 Workflow를 선택하고 바로 실행해 보세요.`
- Avoid `community`, `shared by community`, `Langflow Store`, and external API key signup copy.

## Korean-First UX Rules

Use Korean for explanatory text and user guidance.

Keep English keywords when they are more natural in product UI:

- `Agent`
- `Workflow`
- `Blocks`
- `Template Hub`
- `Test Run`
- `Access Key`
- `Knowledge Base`

Examples:

- `Workflow 만들기`
- `Agent 템플릿 선택`
- `Test Run 실행`
- `Access Key 관리`
- `Knowledge Base 연결`

## Enterprise SaaS Visual Direction

The MakeFlow UI should feel restrained, reliable, and operational.

Prefer:

- Calm enterprise palette.
- Dense but readable layouts.
- Small-radius cards and controls.
- Clear navigation.
- Work-oriented empty states.
- Admin/customer-installed language.

Avoid:

- Open-source community energy.
- Social proof counters.
- Playful community prompts.
- Decorative marketing hero sections inside the app.
- Overly casual copy.

## High-Priority Frontend Areas

Inspect and update these areas first:

- `src/frontend/src/assets`
- `src/frontend/public` if present
- `src/frontend/src/pages/LoginPage/index.tsx`
- `src/frontend/src/pages/SignUpPage/index.tsx`
- `src/frontend/src/pages/DeleteAccountPage/index.tsx`
- `src/frontend/src/components/core/appHeaderComponent/index.tsx`
- `src/frontend/src/components/core/appHeaderComponent/components/langflow-counts.tsx`
- `src/frontend/src/customization/components/custom-langflow-counts.tsx`
- `src/frontend/src/pages/AppInitPage/index.tsx`
- `src/frontend/src/pages/MainPage/pages/empty-page.tsx`
- `src/frontend/src/pages/StorePage/index.tsx`
- `src/frontend/src/modals/IOModal/playground-modal.tsx`
- `src/frontend/src/modals/templatesModal`
- `src/frontend/src/constants/constants.ts`
- `src/frontend/src/customization/config-constants.ts`
- `src/frontend/src/customization/utils/urls.ts`
- `src/frontend/src/locales/en.json`
- Other locale files if language switching remains visible

## Known Existing LangFlow Exposure Points

Initial search found visible references in:

- `src/frontend/src/assets/LangflowLogo.svg`
- `src/frontend/src/assets/LangflowLogoColor.svg`
- `src/frontend/src/assets/langflow_logo_black.svg`
- `src/frontend/src/assets/langflow_logo_white.svg`
- `src/frontend/src/pages/LoginPage/index.tsx`
- `src/frontend/src/pages/DeleteAccountPage/index.tsx`
- `src/frontend/src/components/core/appHeaderComponent/index.tsx`
- `src/frontend/src/components/core/appHeaderComponent/components/langflow-counts.tsx`
- `src/frontend/src/constants/constants.ts`
- `src/frontend/src/locales/en.json`
- `src/frontend/src/customization/utils/urls.ts`
- `src/frontend/src/pages/AppInitPage/index.tsx`
- `src/frontend/src/modals/IOModal/playground-modal.tsx`
- `src/frontend/src/modals/templatesModal/components/GetStartedComponent/index.tsx`

Use `rg` to refresh this list before editing.

## Suggested Implementation Order

1. Add MakeFlow brand constants and assets.
2. Replace header/login/signup/delete-account visible logos and text.
3. Disable GitHub/Discord count UI and related initialization calls.
4. Convert Store labels and copy to Template Hub.
5. Update primary locale strings to Korean-first MakeFlow copy.
6. Replace `Built with Langflow` surfaces in chat/playground UI.
7. Update browser title/favicon/public metadata.
8. Apply restrained enterprise SaaS theme adjustments.
9. Run residual string scans for customer-facing leaks.
10. Build or typecheck the frontend and smoke-test key screens.

## Residual Scan Commands

Run these after changes:

```bash
rg -n "LangFlow|Langflow|Langflow|langflow|Discord|GitHub|github|docs\.langflow|langflow\.org|Langflow Store|Built with Langflow|Community|community" src/frontend/src src/frontend/public -S
```

Classify findings:

- Fix if user-facing.
- Leave only if internal and not visible in Phase 1.
- Document any intentionally deferred occurrences.

## Verification Expectations

Minimum verification:

- Frontend build or typecheck passes.
- Login screen shows MakeFlow only.
- App header shows MakeFlow branding and no GitHub/Discord counters.
- Empty workspace screen uses MakeFlow no-code Agent/Workflow language.
- Store page is presented as Template Hub.
- Chat/playground UI does not show `Built with Langflow`.
- Browser title/favicon do not expose LangFlow.
- No customer-facing external LangFlow/Discord/GitHub links remain.

Preferred manual smoke test:

- Start the frontend dev server.
- Open login.
- Open main dashboard.
- Create/open a workflow.
- Open Test Run/playground.
- Open Template Hub.
- Open Settings.

## Harness Engineering Notes

When continuing this work with Codex:

- Read this file first, then inspect current code with `rg`.
- Prefer small, reviewable patches by surface area.
- Do not rename backend modules during Phase 1.
- Do not delete legal files.
- Keep unrelated upstream LangFlow implementation logic intact.
- Avoid broad mechanical replacements across the whole repository unless findings are clearly frontend-visible.
- Treat customer-facing UI, copy, links, and visual assets as the primary acceptance surface.
