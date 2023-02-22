# dooboo.io

> Project is built mainly with `nextjs`, `react server component` and `supabase`.

[![CI](https://github.com/hyochan/dooboo.io/actions/workflows/ci.yml/badge.svg)](https://github.com/hyochan/dooboo.io/actions/workflows/ci.yml)

<img width="415" alt="landing" src="https://user-images.githubusercontent.com/27461460/189487529-f2942a04-63af-4d6d-9600-d84e50cabeb9.png">

## Environment variables

<details>
<summary>NEXT_PUBLIC_ROOT_URL</summary>

Base url of your web app.
</details>

<details>
<summary>JWT_SECRET</summary>

Used in server-side when you want to encode & decode data when communicating with client.
</details>

<details>
<summary>DATABASE_URL</summary>

Database connection url to access database in [Supabase](https://supabase.io).
</details>

<details>
<summary>SUPABASE_URL</summary>

Supabase database url.
</details>

<details>
<summary>SUPABASE_API_KEY</summary>

Supabase api key.
</details>

<details>
<summary>GITHUB_CLIENT_ID</summary>

The github client id to access github api.
</details>

<details>
<summary>GITHUB_CLIENT_SECRET</summary>

The github client secret to access github api.
</details>

<details>
<summary>GH_TOKEN</summary>

The github token to use github authentication.
</details>

> We strongly recommend to organize multiple environment files for prisma migration or testing.

```
cp `.env.sample` `.env.dev` // For Prisma migration
cp `.env.sample` `.env.test` // For testing
cp `.env.sample` `.env.local` // For developing
```

## Installation

### 1. Prepare Supabase account

1. Create [Supabase](https://supabase.com) project

1. Set alias in your bash and set supabase project reference id

   ```
   alias SUPABASE_PROJECT_DOOBOOIO = 
   ```

   Now, you can generate supabase types with our script.

   ```
   generate:supabase
   ```

### 2. Prepare Database

Run `yarn migrate:dev` to you local database then when every is done right, you can then run `yarn migrate:prod` to update production database in Supabase.

### 3. Copy environment variables

```
cp .env.sample .env.local
```

Check the environment variables stated in [Environment variables](#1-environment-variables) and replace to your own.

### Tips

> When using yarn berry and TS fails after upgrading packages, try to follow below steps.

1. `yarn set version berry`
1. `yarn`
1. `yarn dlx @yarnpkg/sdks vscode`
1. `yarn plugin import typescript`
1. `yarn dlx @yarnpkg/sdks vscode`
   - Useful when prettier extension is not working.
