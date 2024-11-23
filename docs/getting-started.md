# Getting started

## Requirements

- [nvm](https://github.com/nvm-sh/nvm)
- [Docker](https://www.docker.com/)

## Setup

1. Clone the repository
2. (Optional) Append the following to [.git/hooks/post-merge](../.git/hooks/post-merge)
   - Make sure the file is executable: `chmod +x .git/hooks/post-merge`

```sh
#!/bin/sh
`./git-hooks/post-merge`
```

3. Configure environment variables
   1. Duplicate the `example.env` files to `.env` and fill in the blanks.
   2. `apps/app/example.env` -> `apps/app/.env`
   3. `apps/playwright/example.env` -> `apps/playwright/.env`
   4. `packages/database/example.env` -> `packages/database/.env`
4. Start up the database: `docker compose up`
5. Open a second terminal
6. Install required Node.js version: `nvm install`
7. Install dependencies: `npm ci --prefer-offline`
8. Update the database's schema: `npx --workspace=packages/database prisma migrate dev`
9. Run the app: `npx turbo run @nextjs-template/app#dev`
10. Create an developer account
    1. Signup at <http://localhost:3000/signup>
    2. Verify the email address at <http://localhost:1080>
    3. Change the `role` of the account to `DEVELOPER` in the database
