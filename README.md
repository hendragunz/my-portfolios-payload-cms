# Hendra Gunawan — Full-Stack Developer Portfolio & CMS

A modern **Next.js 16 (App Router)** portfolio and headless-style CMS built with
React 19, TypeScript, and Tailwind CSS v4. Includes an interactive project
showcase, an engineering blog, and a client-side admin CMS backed by
`localStorage`.

## Tech Stack

- **Next.js 16** — App Router, hybrid rendering
- **React 19** + TypeScript
- **Tailwind CSS v4** — via `@tailwindcss/postcss`
- **lucide-react**, **canvas-confetti**
- Runs on **Node.js v26.4.0** (see `.nvmrc` / `.node-version`)

## Project Structure

```
src/
  app/          # Next.js App Router routes
    page.tsx          # Home (hero, projects, skills, blog, contact)
    projects/         # /projects & /projects/[slug]
    blogs/            # /blogs & /blogs/[slug]
    admin/            # /admin (CMS, client-side auth gate)
    layout.tsx        # Root layout + providers
    globals.css       # Tailwind + custom styles
  components/   # UI components (Navbar, Hero, CMS, etc.)
  context/      # ThemeProvider & DataProvider (localStorage CMS)
  data/         # Initial seed data
  utils/        # navigation, auth, analytics
```

## Run Locally

**Prerequisites:** Node.js 26.4.0 (`nvm use`)

1. Install dependencies:
   `npm install`
2. (Optional) Set analytics in `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTIC_KEY="G-XXXXXXXXXX"
   ```
3. Run the dev server:
   `npm run dev`

## Scripts

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `npm run dev`    | Start Next.js dev server (port 3000) |
| `npm run build`  | Production build                |
| `npm start`      | Start the production server     |
| `npm run lint`   | Type-check with `tsc --noEmit`  |
| `npm run clean`  | Remove `.next` build output     |

## Admin CMS

Visit `/admin` and log in (default: `admin` / `password123`) to manage blog
posts, projects, skills, and work experience. Data persists in your browser's
`localStorage` and can be exported/imported as JSON from the Schema tab.
