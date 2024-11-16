# Playwright

1. `cd apps/playwright && docker compose up`
2. Open a second terminal
3. `npx --workspace=packages/database prisma db push`
4. `npm run build --workspace=apps/app`
5. `npx --workspace=apps/playwright playwright install --with-deps`
6. `npx --workspace=apps/playwright playwright test --ui`
