# Venkata Prasanna Enterprises (VPE) — Industrial Service Management
## Frontend Architecture & Foundation Documentation

Production frontend web and mobile application foundation for **Venkata Prasanna Enterprises (VPE)**.

---

### 1. Technology Stack
- **Framework:** React 19 + TypeScript (Strict typing enabled)
- **Build Tool:** Vite 8 (with native ES modules & HMR)
- **Styling & Tokens:** Tailwind CSS v4 + Custom Industrial Theme Tokens
- **Routing:** React Router DOM v7 (`BrowserRouter`, type-safe path constants)
- **Icons:** Lucide React (Clean, accessible, industrial SVGs)
- **Linter:** Oxlint (0 warnings, 0 errors)

---

### 2. Architecture & Directory Hierarchy

```text
src/
├── assets/                 # Static branding assets and images
├── components/
│   ├── common/             # Reusable Design System components (WCAG accessible)
│   │   ├── Badge/          # Status tags (Pending, Completed, Critical, etc.)
│   │   ├── Button/         # Primary, Industrial, Secondary, Outline, Ghost, Danger
│   │   ├── Card/           # Card, CardHeader, CardTitle, CardContent, CardFooter
│   │   ├── Container/      # Responsive containers (sm, md, lg, xl, 2xl, full)
│   │   ├── Feedback/       # Spinner, Skeleton, LoadingState, ErrorState, EmptyState
│   │   ├── Form/           # FormField, Input, Textarea, Select, Checkbox
│   │   ├── SectionHeading/ # Standardized headings with badges and subtitles
│   │   ├── Typography/     # Typography hierarchy (h1-h6, lead, body, mono)
│   │   ├── PagePlaceholder.tsx # Reusable route placeholder boundary
│   │   └── ScrollToTop.tsx # Instant scroll reset on route changes
│   │   └── index.ts        # Unified public barrel export
│   └── layout/             # High-level application shells
│       ├── Navbar.tsx      # Responsive header with industrial drawer & emergency bar
│       ├── Footer.tsx      # Comprehensive industrial footer with SLAs & certifications
│       ├── PublicLayout.tsx# Public wrapper with skip-link, Navbar, and Footer
│       ├── AppLayout.tsx   # Portal shell for Customer, Engineer, and Admin modules
│       └── index.ts        # Unified layout barrel export
├── pages/                  # Route views
│   ├── public/             # Public-facing informational routes
│   │   ├── HomePage.tsx    # Foundation preview & design system showcase
│   │   ├── AboutPage.tsx   # /about
│   │   ├── ServicesPage.tsx# /services
│   │   ├── IndustriesPage.tsx # /industries
│   │   ├── VendorExperiencePage.tsx # /vendor-experience
│   │   ├── ServiceChargesPage.tsx # /service-charges
│   │   ├── ReviewsPage.tsx # /reviews
│   │   └── ContactPage.tsx # /contact
│   ├── auth/               # Authentication route boundaries
│   │   ├── LoginPage.tsx   # /login
│   │   └── RegisterPage.tsx# /register
│   ├── customer/           # Customer Portal placeholders
│   │   ├── CustomerDashboardPage.tsx       # /customer/dashboard
│   │   ├── CustomerServiceRequestPage.tsx  # /customer/service-request
│   │   └── CustomerRequestsPage.tsx        # /customer/requests
│   ├── engineer/           # Field Engineer Portal placeholders
│   │   ├── EngineerDashboardPage.tsx       # /engineer/dashboard
│   │   └── EngineerRequestsPage.tsx        # /engineer/requests
│   ├── admin/              # Operations Admin Portal placeholders
│   │   └── AdminDashboardPage.tsx          # /admin/dashboard
│   ├── NotFoundPage.tsx    # 404 Route catch-all
│   └── index.ts            # Central pages export
├── routes/
│   ├── paths.ts            # ROUTES constant mapping all routes type-safely
│   ├── AppRoutes.tsx       # Route definitions & layout wrappers
│   └── index.ts
├── styles/
│   ├── index.css           # Global resets, Tailwind CSS v4, skip link, and tokens
│   └── theme.ts            # Design tokens documentation (colors, spacing, typography)
├── types/
│   └── index.ts            # Core TypeScript interfaces for UI & routing
├── App.tsx                 # Root application wrapper with BrowserRouter
└── main.tsx                # React DOM entry point
```

---

### 3. Route Matrix

| Route URI | Purpose | Layout | Scope |
|---|---|---|---|
| `/` | Foundation Preview & Architecture Index | `PublicLayout` | Public |
| `/about` | Corporate Overview & ISO Standards | `PublicLayout` | Public |
| `/services` | Industrial Services & Maintenance Catalog | `PublicLayout` | Public |
| `/industries` | Manufacturing, Energy & Processing Verticals | `PublicLayout` | Public |
| `/vendor-experience` | OEM Network & Certified Parts Sourcing | `PublicLayout` | Public |
| `/service-charges` | Tariff Cards & SLA Commitments | `PublicLayout` | Public |
| `/reviews` | Verified Client Testimonials | `PublicLayout` | Public |
| `/contact` | Emergency Dispatch Hotline & Inquiries | `PublicLayout` | Public |
| `/login` | Unified Portal Login | `PublicLayout` | Auth Placeholder |
| `/register` | Client Corporate Account Registration | `PublicLayout` | Auth Placeholder |
| `/customer/dashboard` | Client Service Operations Dashboard | `AppLayout` | Customer Module |
| `/customer/service-request` | Create Equipment Breakdown Ticket | `AppLayout` | Customer Module |
| `/customer/requests` | Service Request Tracking & History | `AppLayout` | Customer Module |
| `/engineer/dashboard` | Field Service Engineer Desk | `AppLayout` | Engineer Module |
| `/engineer/requests` | Assigned Field Tasks & Work Orders | `AppLayout` | Engineer Module |
| `/admin/dashboard` | Operations Command Console | `AppLayout` | Admin Module |

---

### 4. Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server (with HMR)
npm run dev

# 3. Check for TypeScript and lint compliance
npm run lint

# 4. Create production build
npm run build

# 5. Preview production build locally
npm run preview
```

---

### 5. Architectural Standards & Developer Hand-off

1. **Zero Mock/Fake Data:**
   - Adheres strictly to production engineering rules. No simulated JSON or artificial API delays exist.
   - When real APIs (REST/GraphQL) are introduced, create an `api/` directory with typed request clients (e.g. `api/client.ts`, `api/tickets.ts`) and react query / custom hooks.

2. **Reusability First:**
   - Always import design system components from `@/components/common` (e.g., `Button`, `Card`, `Container`, `FormField`, `Input`, `Typography`, `Spinner`, `ErrorState`, `EmptyState`, `Badge`).
   - Do not repeat arbitrary utility padding or colors when existing design tokens and components already satisfy the design.

3. **Type-Safe Navigation:**
   - Always reference routes using `ROUTES.PUBLIC.<PAGE>`, `ROUTES.CUSTOMER.<PAGE>`, etc. from `@/routes/paths`. Never hardcode raw strings like `"/customer/dashboard"`.

4. **Accessibility (WCAG 2.1 AA):**
   - The skip-to-content link is embedded in `PublicLayout`.
   - All interactive controls have visible focus rings (`focus-visible:ring-2`).
   - Form inputs are bound to label elements and error descriptions via `aria-describedby` and `aria-invalid`.
