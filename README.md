# Task Tracker

A task management application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Clerk** for authentication, and **PostgreSQL** (via **Neon** and **Prisma**).

Deployed on **Vercel**:  
🔗 [Live Site](https://task-tracker-wine-xi.vercel.app/)

---

## 🚀 Project Setup

### 1. Create Next.js App
This project was bootstrapped using:

```bash
npx create-next-app@latest
```

Selected options:
- **TypeScript**: Yes
- **ESLint**: Yes
- **Tailwind CSS**: Yes
- **src/ directory**: No
- **App Router**: Yes
- **Turbopack**: Yes
- **Custom import alias**: No

---

### 2. Install Clerk (Authentication)

```bash
npm install @clerk/nextjs
```

- Clerk is used to manage authentication and user sessions.

---

### 3. Set Up Prisma and Neon (Database)

Install the dependencies:

```bash
npm install prisma @prisma/client neon-serverless
```

**Environment Variables (`.env.local`):**

```env
# Clerk Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZmluZXItYmVkYnVnLTYxLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_Erh5Sd81sqCUiisZKpMdo63IZFu9lLQyOx39GdNQNd
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
SIGNING_SECRET=whsec_JQ3qxbY5YiUtlFFjIb4pnN4AmpjjrO3w

# Database URL (Neon - PostgreSQL)
DATABASE_URL="postgresql://neondb_owner:npg_05cXQytGrdMF@ep-shrill-butterfly-ac9p9ott-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"
```

> **Note:**  
> `.env.local` must **not** be committed to Git for security reasons.

---

### 4. Prisma Setup

To ensure Prisma reads `.env.local`, install:

```bash
npm install -D dotenv-cli
```

#### Prisma Migration Commands:

- Create the initial migration:
  ```bash
  npx dotenv -e .env.local -- npx prisma migrate dev --name init
  ```
  or (if your Prisma is already linked to `.env.local`):
  ```bash
  npx prisma migrate dev --name init
  ```

- Generate Prisma client:
  ```bash
  npx prisma generate
  ```

- Push the schema to the database without creating a migration:
  ```bash
  npx prisma db push
  ```

- Open the Prisma GUI:
  ```bash
  npx prisma studio
  ```

> **About these commands:**
> - `npx prisma migrate dev`: Applies migrations and generates the client.
> - `npx prisma generate`: Regenerates the Prisma client manually.
> - `npx prisma db push`: Pushes schema changes to the database without creating migration files.

---

### 5. Clerk Webhooks Integration

Install **svix** to handle **user event webhooks** from Clerk:

```bash
npm install svix
```

- This allows the app to react to **user created**, **updated**, and **deleted** events.

---

### 6. Heroicons for UI Elements

Install **Heroicons** for beautiful, ready-to-use icons:

```bash
npm install @heroicons/react
```

---

## 📦 How to Run the Project Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
npm install
```

Start the development server:

```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000)

---

## 🏩 Architectural Decisions

- **Next.js App Router** for routing and server-side rendering (SSR).
- **TypeScript** for strict typing and better developer experience.
- **Tailwind CSS** for rapid, utility-first styling.
- **Clerk** for secure authentication, sessions, and webhook management.
- **PostgreSQL (Neon)** for scalable relational database hosting.
- **Prisma ORM** for type-safe database access and migrations.
- **Turbopack** for faster development builds.

---

## ⚙️ Deployment

- Deployment is handled via **Vercel** directly from the GitHub repository.
- Environment variables are set in the **Vercel dashboard** for production.

Live Application:  
🔗 [https://task-tracker-wine-xi.vercel.app/](https://task-tracker-wine-xi.vercel.app/)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

# ✅ Future Enhancements (Optional)
- Add project-specific roles and permissions using Clerk.
- Extend task models with tags, deadlines, and priorities.
- Implement notifications via Clerk and third-party services.


