# Playwright

1. `npm run build`
2. `cd playwright`
3. `npm ci`
4. `npx playwright install --with-deps`
5. `docker compose up`
6. `npx prisma generate --schema=../prisma/schema.prisma --generator=playwrightClient`
7. `npx prisma db push --schema=../prisma/schema.prisma`
8. `npx playwright test --ui`
