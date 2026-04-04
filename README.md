# The Blog

A full-stack blogging platform built with Next.js 16, featuring a public-facing reader experience and a password-protected admin panel for managing posts.

## Features

- Public blog with post listing and individual post pages
- Markdown editor with live preview for writing posts
- Syntax highlighting in rendered posts
- Slug auto-generated from post title with uniqueness validation
- Password-protected admin panel (`/login`)
- Rate-limited login to prevent brute-force attacks
- Session management with encrypted cookies via `iron-session`
- Light/dark theme toggle
- PostgreSQL database via [Neon](https://neon.tech) with Drizzle ORM

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **Database:** PostgreSQL (Neon serverless) + Drizzle ORM
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Auth:** iron-session
- **Linting/Formatting:** Biome

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/the-blog.git
cd the-blog
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable         | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `DATABASE_URL`   | PostgreSQL connection string (Neon recommended)          |
| `ADMIN_PASSWORD` | Password to access the admin panel at `/login`           |
| `SESSION_SECRET` | Random string (min 32 chars) used to encrypt the session |

### 4. Run database migrations

```bash
pnpm drizzle-kit migrate
```

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the public blog.
The admin panel is available at [http://localhost:3000/login](http://localhost:3000/login).

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public blog pages
│   └── admin/
│       ├── (auth)/        # Login page
│       └── (panel)/       # Admin dashboard and post management
├── components/
│   ├── layout/            # Feature-specific components
│   └── ui/                # shadcn/ui primitives
├── db/                    # Drizzle schema and client
├── features/
│   ├── auth/              # Login/logout server actions
│   └── posts/             # Post CRUD server actions and queries
└── lib/                   # Utilities (session, rate limit, markdown, slug)
```

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Start the development server       |
| `pnpm build`     | Build for production               |
| `pnpm start`     | Start the production server        |
| `pnpm lint`      | Run Biome linter                   |
| `pnpm format`    | Format code with Biome             |
