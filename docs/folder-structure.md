# Folder structure

- `apps`: Applications which can be run
  - `app`: The main application
    - `src`: Separate _modules_ of the application. These should be defined based on domains. If a module should be able to be used in other apps, it should be moved to the `packages` folder instead.
      - `app`: Routes of the Next.js application. Most of the modules will be used here.
      - `common`: Module for common code used by other modules
      - `authentication`: Module for all authentication related code
      - `users`: Module for all user related code
      - `teams`: Module for all team related code
  - `playwright`: E2E tests for applications
- `packages`: hared code which can be used by multiple apps
