# ✨ BlogCraft

**BlogCraft** is a full-stack Medium-style blogging application that allows users to create, publish, and manage blog posts. Built using modern technologies like React, Hono, and TypeScript, the platform provides a clean, responsive UI and a fast backend API with JWT authentication and PostgreSQL support.

🌐 Live Site: [https://blogging-website-b0yg.onrender.com/](https://blogging-website-b0yg.onrender.com/)

---

https://github.com/user-attachments/assets/7dbe4841-163c-4987-9db9-2c4a926f3729

---

## 🚀 Features

* 📝 Create, edit, and delete blog posts
* 🔐 Secure login and registration
* 🎯 JWT authentication with cookie-based sessions
* 🔄 Real-time rendering of newly published blogs
* 📱 Fully responsive UI
* 🔍 Search and filter (planned)
* ❤️ Like/follow features (coming soon)

---

## 🧱 Tech Stack

**Frontend:**

* React
* TypeScript
* Tailwind CSS
* Recoil (state management)
* Own custom NPM module

**Backend:**

* Hono (Cloudflare Workers)
* Prisma ORM
* PostgreSQL (Accelerate)
* JWT Authentication
* Cookie-based sessions

---

## 🛠️ Local Development Setup

### 📦 Prerequisites

* Node.js & npm
* Cloudflare account
* Wrangler CLI 
* PostgreSQL database

---

### 💻 Frontend Setup

1. Clone the repo:

```
git clone https://github.com/your-username/blogcraft.git

```

2. Install and run frontend:

```
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

### 🔧 Backend Setup

1. Move to backend:

```
cd backend
npm install
```

2. Create a Cloudflare account: [https://cloudflare.com](https://cloudflare.com)

3. Install Wrangler:

```
npm install -g wrangler

```

4. Create two files in the backend folder:

* `.env`
* `wrangler.toml`

Example `.env`:

```
DATABASE_URL=your_postgres_db_url

```

Example `wrangler.toml`:

```
name = "blogcraft-backend"
type = "javascript"
account_id = "your_cloudflare_account_id"
workers_dev = true
compatibility_date = "2024-05-26"

[vars]
ACCELERATE_DB_URL = "your_accelerate_db_url"
JWT_SECRET = "your_jwt_secret"
COOKIE_SECRET = "your_cookie_secret"
```

5. Run database migration:

```
npx prisma migrate dev

```

6. Start backend server locally:

```
wrangler dev

```

Open [http://localhost:8787](http://localhost:8787)

---

## 🤝 Contributing

Contributions are welcome!


## 😋 Contact

* GitHub: [https://github.com/yourusername](https://github.com/yourusername)
* Email: [your.email@example.com](mailto:your.email@example.com)

---
