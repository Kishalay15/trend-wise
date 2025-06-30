
# TrendWise

TrendWise is a full-stack web application that automatically generates SEO-optimized blog articles from trending topics on Google. It uses Puppeteer to scrape trending searches, Gemini API to generate articles, and a clean frontend built with Next.js to display them. Admins can trigger content generation manually, and users can read insightful, up-to-date content effortlessly.

---

## 🔥 Features

- ✨ **Trending Topic Detection** (Google Trends via Puppeteer)
- 🤖 **AI Article Generation** (Gemini API)
- 📝 **Markdown + HTML Blog Rendering**
- 👥 **Google Login Authentication** (NextAuth.js)
- 🔐 **Admin-Only Article Generation**
- ⚙️ **MongoDB-Based Persistence**
- 📈 **SEO-Optimized Titles and Descriptions**
- 🌐 **Deployed via Vercel (Frontend) and Render (Backend)**

---

## 🧱 Tech Stack

### Frontend
- **Next.js 14** (App Router, SSR)
- **Tailwind CSS**
- **NextAuth.js** (Google Auth)
- **Axios** (API calls)

### Backend
- **Node.js + Express.js**
- **MongoDB (Mongoose)**
- **Puppeteer** (Google Trends Scraping)
- **Gemini API** (Content Generation)
- **Winston Logger**

---

## 🛠️ Environment Variables

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:9090/api
NEXT_PUBLIC_ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com
```

### Backend (`.env`)
```env
PORT=9090
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🚀 Getting Started

### 🧩 Backend Setup

```bash
cd backend
npm install
npm run dev
```

To generate a blog manually:
```bash
node scripts/generateFromTrends.js
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access at [http://localhost:3000](http://localhost:3000)

---

## 👤 Admin Access

Only emails listed in `NEXT_PUBLIC_ADMIN_EMAILS` can access the `/admin` dashboard and generate new articles manually.

---

## 📝 API Endpoints

### Articles
- `GET /api/articles` – List all articles
- `GET /api/articles/:slug` – Get a single article

### Admin
- `POST /api/admin/generate` – Generate article (admin only)

---

## 📦 Deployment

- **Frontend:** Deployed on **Vercel**
- **Backend:** Deployed on **Render**

---

## 🚀 Live Demo

[View Deployed App](https://trend-wise-frontend.vercel.app)

---

Made with 💜 by Kishalay Lahiri
