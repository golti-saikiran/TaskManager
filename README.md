# 📝 Task Manager (Next.js + Clerk + MongoDB)

A full-stack **Task Manager App** built with **Next.js 14 (App Router)**, **Clerk authentication**, **MongoDB Atlas**, and **TailwindCSS**.  
Users can **sign in**, **create tasks**, **filter/search tasks**, and **track progress** with stats — all deployed on **Netlify**.  

---

## 🚀 Demo

🔗 [Live Demo](https://your-netlify-url.netlify.app)  

---

## ✨ Features

- 🔐 **Authentication** with [Clerk](https://clerk.com)  
- 🗂️ **Task Management** (CRUD: create, read, update, delete)  
- 🔍 **Search & Filter** (by status & priority)  
- 📊 **Stats Dashboard** (completed, in progress, priorities)  
- 🎨 **Modern UI** with TailwindCSS  
- ☁️ **MongoDB Atlas** for persistence  
- 🌐 **Deployed on Netlify**  

---

## 🛠️ Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)  
- [Clerk](https://clerk.com/) (Authentication)  
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)  
- [TailwindCSS](https://tailwindcss.com/)  
- [Netlify](https://www.netlify.com/) (Deployment)  

---

## 📦 Installation & Setup

Clone the repo:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

npm install

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
MONGO_URI=your-mongodb-uri
NEXT_PUBLIC_APP_URL=http://localhost:3000

npm run dev
```

## 🚀 Deployment (Netlify)

Push your repo to GitHub.

Connect the repo on Netlify
.

Add your environment variables in Netlify dashboard (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, MONGO_URI, NEXT_PUBLIC_APP_URL).

Deploy 🎉


🤝 Contributing

Contributions are welcome! Fork the repo, make changes, and open a PR.
