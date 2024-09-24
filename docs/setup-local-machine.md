# Setup Local Machine

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

3. Configure environment variables: Duplicate [.env.example](../.env.example) to [.env](../.env) and fill in the blanks.
4. Start up the database: `docker compose up`
5. Open a second terminal
6. Install required Node.js version: `nvm install`
7. Install dependencies: `npm ci --prefer-offline`
8. Update the database's schema: `npx prisma migrate dev`
9. Run the app: `npm run dev`
10. Access the app at: <http://localhost:3000>
