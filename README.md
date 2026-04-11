# 🛒 Fresh Cart

E-commerce application built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, and **shadcn/ui**.

---

## 🔧 Tech Stack

| Technology | Version |
|---|---|
| Next.js | 16.2.1 |
| React | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| shadcn/ui | ^4.1.0 |
| Radix UI | ^1.4.3 |

---

## 📂 Full Project Structure

```text
fresh-cart/
├── src/
│   ├── app/
│   │   ├── page.tsx                    ← Home page
│   │   ├── home.interface.ts           ← Home data interfaces
│   │   ├── home.services.ts            ← Home data fetching
│   │   ├── layout.tsx                  ← Root layout
│   │   ├── globals.css                 ← Global styles & theme
│   │   ├── (auth)/                     ← Auth route group
│   │   ├── shop/                       ← Shop page
│   │   ├── cart/                       ← Cart page
│   │   ├── wishlist/                   ← Wishlist page
│   │   └── ...
│   │
│   ├── components/
│   │   ├── shared/                     ← Shared Client & Server components used across app
│   │   │   └── AppButton/
│   │   │       └── AppButton.tsx       ← "use client" wrapper
│   │   └── ui/                         ← shadcn/ui base components
│   │
│   ├── assets/                         ← Static assets (SVGs, images)
│   └── lib/
│       └── utils.ts                    ← Utility functions (cn, etc.)
│
├── next.config.ts
├── package.json
└── .env.development
```

---

## 🏗️ Architecture & Convention Rules

### Rule 1: Page Routes (`src/app/`)
Each page route folder follows a strict separation of concerns, ideally containing **3 to 4 files**:

```text
src/app/pagename/
├── page.tsx                  ← Page component (Server Component by default)
├── pagename.interface.ts     ← TypeScript interfaces for API data
├── pagename.services.ts      ← Data fetching abstraction layer
└── pagename.action.ts        ← Server Actions (Secure mutations using "use server")
```

- **`pagename.interface.ts`**: Types and interfaces mapped from API responses.
- **`pagename.action.ts`**: Server logic (`"use server"`). Secure mutations, direct API calls, and data patching.
- **`pagename.services.ts`**: Clean abstraction to call `.action.ts` methods or API wrappers without complex imports inside Client Components.
- **`_components/` (Co-location Pattern)**: If a component is **only** used by this specific page, place it in an internally scoped `_components/` folder to prevent Next.js from routing it. Do **not** pollute `src/components/shared/` with page-specific pieces.

### Rule 2: Component Structure (`src/components/`)
Components live in their own PascalCase folder containing a single `.tsx` file.
- ✅ Folder name = Component name (`ProductCard/`)
- ✅ Inside: **one file only** (`ProductCard.tsx`)
- ❌ Do NOT put multiple separate components in the same file.

### Rule 3: Server-First & Client Islands (Critical)
> **Everything is a Server Component by default.** Only move to `"use client"` when absolutely necessary.

- **When to use `"use client"`:** Event handlers (`onClick`), browser APIs (`window`), and state/hooks (`useState`, `useEffect`).
- **Client Island Pattern:** Instead of making the whole layout `"use client"`, extract just the interactive piece (e.g., `<NavbarUserActions />`) into a client component and import it into the static server layout.

### Rule 4: Logic Separation (Critical for Client Components)
> **In complex Client Components, separate UI from Logic.**

```text
src/app/pagename/_components/
├── Form.tsx          ← UI only (JSX, styling, mapping)
└── Form.logic.tsx    ← Hook only (State, fetch handlers, `useForm`)
```
Create a custom hook like `useFormLogic()` in `.logic.tsx`. Import it inside `.tsx` and destructure constraints to keep the JSX exceptionally clean.

### Rule 5: Extract-to-Component
> **A `page.tsx` should only compose components. Never write massive inline JSX.**
- Any UI block with more than 5–6 JSX lines should be its own component.
- Example: Instead of 50 lines of Sidebar markup in `page.tsx`, extract it to `<Sidebar />`.

### Rule 6: Check Before Create
> **Always check if a component exists before building it.**
- Reusable elements like `ProductCard`, `HeroBanner`, `AppButton`, `AddToCartButton` already exist.
- Search `src/components/shared/` before assuming you need a new generic component.

### Rule 7: Shared Client Components (`src/components/shared/`)
- All app-wide `"use client"` features go here.
- **The AppButton Rule:** Never use shadcn's `Button` directly in an app feature. Always wrap it or use `AppButton` from the shared folder `src/components/shared/AppButton/AppButton.tsx`.

---

## 🔐 Authentication (NextAuth.js)

Authentication uses NextAuth.js (v4) with credentials centralization.
- **Configuration:** `src/components/NextAuth/NextAuth.ts`
- **Server Data Retrieval:** `await getServerSession(authOptions)`
- **Client Data Retrieval:** `useSession()` from `next-auth/react`
- **Post-Login Reset Rule:** After signing in on the client, you must trigger a full page reload by using `window.location.assign("/")` instead of `router.push("/")`. This securely syncs API state (Cart, Wishlist headers relying on `token`).

---

## 🎨 Design System Rules

> **shadcn/ui** is the mandated component library.

- ❌ Do not use other component libraries (MUI, Chakra).
- ✅ Install Shadcn defaults as needed (`npx shadcn@latest add dialog`). Added primitives will appear in `src/components/ui/`. DO NOT alter those base files natively.
- ✅ Wrap primitives inside `src/components/shared/` for project-wide adjustments.
- ✅ Use Tailwind CSS for utility enhancements. Use `lucide-react` for iconography.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## ⚠️ Important Notes

- **React Compiler:** Enabled strictly in production to bypass development CPU drains.
- **Image Optimization:** Strictly use `next/image` (`<Image />`); natively prevents CLS shifts.
- **Environment variables:** Maintain secure `NEXT_PUBLIC_BASE_URL` contexts inside both `.env.development` and `.env.production`.

---

## 🤖 AI / Agent Rules

- **Respect Next.js App Router Paradigms.** Do not use `pages/` conventions. Remember Server Actions syntax and boundaries.
- **Follow `README.md` blindly.** Before writing architecture, verifying if you should be in `.services.ts`, `.action.ts`, or `.logic.tsx` is paramount.
- **Don't Execute Without Asking:** Always wait for the user to confirm `"ok"` after recommending terminal commands (like npm installs or shadcn additions).

---

## 📌 Project State & Handoff (Latest Achievements)

1. **Lazy Loading (Streaming):** `<Suspense>` caching applied to Home layout sections for pristine TTFB.
2. **Category Architecture:** Models purely isolated to `/category/category.services.ts`.
3. **Wishlist Architecture:** Moved from local grid to heavily structured robust table design aligning with the live Figma context.
4. **Wishlist API Syncing:** Optimistic UI hooks successfully bound backend routemisr state (`POST`, `DELETE`, `GET`) using Token validations.
5. **Contact UI Setup:** Replicated Vercel target (`/contact`) using native shadcn bindings (`Input`, `Select`, `Textarea`).
6. **3D Cards Context:** Flipping models driven by `perspective` globals on `ProductCard` clicks.
7. **Cart Feedback:** Success overlays + dynamic disabling overlay on bulk operations active.
8. **Auth Redesign:** Polished `Forgot Password` flows incorporating floating cards + pulsing load indicators.
