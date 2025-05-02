# Task Tracker

A task management application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, custom authentication using **Upstash Redis**, and **PostgreSQL** (via **Neon** and **Prisma**).

Deployed on **Vercel**:
🔗 [Live Site](https://task-tracker-auth-git-auth-sergios-projects-03bd13e1.vercel.app/)

---

## ✨ Project Setup

### 1. Create Next.js App

This project was bootstrapped using:

```bash
npx create-next-app@latest
```

Selected options:

* **TypeScript**: Yes
* **ESLint**: Yes
* **Tailwind CSS**: Yes
* **src/ directory**: No
* **App Router**: Yes
* **Turbopack**: Yes
* **Custom import alias**: No

---

### 2. Install Dependencies

#### Core libraries:

```bash
npm install prisma @prisma/client neon-serverless
npm install zod
npm install react-hook-form zod @hookform/resolvers
npm install @upstash/redis
npm install @heroicons/react
```

#### Remove Clerk and unused packages:

```bash
npm uninstall svix
npm uninstall @clerk/nextjs
```

> **Note:** We replaced Clerk with a custom authentication system using secure sessions stored in Redis (Upstash).

---

### 3. Configure Environment Variables

**.env.local**

```env
# Redis (Upstash)
UPSTASH_REDIS_REST_URL="https://your-upstash-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"

# PostgreSQL (Neon)
DATABASE_URL="postgresql://your-user:your-password@your-neon-db-url?sslmode=require"

# App URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Security Note**: Never commit `.env.local` to Git.

---

### 4. Prisma Setup

To ensure Prisma reads `.env.local`, you may install:

```bash
npm install -D dotenv-cli
```

#### Prisma Commands:

* Create the initial migration:

  ```bash
  npx prisma migrate dev --name init
  ```

* Generate Prisma client:

  ```bash
  npx prisma generate
  ```

* Push schema changes (without migration):

  ```bash
  npx prisma db push
  ```

* Open Prisma Studio:

  ```bash
  npx prisma studio
  ```

---

## 🚜 How to Run the Project Locally

Clone and install dependencies:

```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
npm install
```

Start development server:

```bash
npm run dev
```

Access: [http://localhost:3000](http://localhost:3000)

---

## 🏣 Architectural Decisions

* **Next.js App Router** for SSR and dynamic routing
* **Tailwind CSS** for fast UI development
* **TypeScript** for static typing
* **Zod** for schema validation
* **Upstash Redis** for session management
* **PostgreSQL (Neon)** for relational data
* **Prisma** as the ORM
* **Turbopack** for optimized local builds

---

## ⚙️ Deployment

* Deployed on **Vercel** with GitHub integration
* Production secrets configured in Vercel dashboard

Live App:
🔗 [https://task-tracker-wine-xi.vercel.app/](https://task-tracker-auth-git-auth-sergios-projects-03bd13e1.vercel.app/)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).