# ⚡ URL-Shortener

> A lightning-fast, production-ready URL shortener microservice built with **Go (Fiber)** and **Redis**, featuring a modern, soft-themed minimalist web interface and containerized with **Docker**.

<div align="center">
  <img width="1920" height="926" alt="image" src="https://github.com/user-attachments/assets/b6713d5b-7d4a-4f35-a3bc-b5f44e59d67d" />
</div>

---

## ✨ Features

* **High-Performance Backend**: Built with Go and the Fiber framework for ultra-low latency and high concurrency.
* **In-Memory Caching & Rate Limiting**: Powered by Redis to manage quick URL lookups, link tracking, and built-in rate-limiting per client.
* **Custom Aliases**: Allows users to specify custom, personalized short links instead of random strings.
* **Soft-Themed UI**: Designed with a warm pastel palette, clean typography, ambient background glows, and a responsive card layout.
* **Modular Frontend Architecture**: Cleanly separated HTML, external CSS, and vanilla JavaScript assets served via Fiber's static file middleware.
* **Containerized Deployment**: Fully containerized using a multi-stage Docker build and Docker Compose for seamless environment replication.

---

## 🛠️ Tech Stack

* **Language**: Go (Golang)
* **Web Framework**: Fiber v2
* **Database & Cache**: Redis
* **Frontend**: HTML5, Tailwind CSS (v4 via CDN), Custom CSS / Vanilla JavaScript
* **DevOps**: Docker, Docker Compose

---

## 📂 Project Architecture

```text
URL-Shortner/
├── api/
│   ├── database/       # Redis client configuration & connection logic
│   ├── helpers/        # Input validation & domain verification helpers
│   ├── routes/         # Route controllers (ShortenURL, ResolveURL)
│   └── static/         # Modular frontend assets
│       ├── css/        # Custom styles & ambient theme effects
│       ├── js/         # Client-side form handling & clipboard logic
│       ├── index.html  # Landing page markup
│       └── screenshot.png # UI preview image
├── .env                # Environment variables
├── Dockerfile          # Multi-stage Docker build instructions
├── docker-compose.yml  # Container orchestration for API and Redis
├── go.mod              # Go dependencies
├── go.sum              # Go module hashes
└── main.go             # Application entry point & middleware setup
```

---

## 🚀 Getting Started Locally

### Prerequisites
* Go (1.21+) installed on your machine
* Docker & Docker Compose running

### 1. Clone the Repository
```bash
git clone [https://github.com/Kshiti-24/URL-Shortener.git](https://github.com/Kshiti-24/URL-Shortener.git)
cd URL-Shortener
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (or use the provided defaults):
```env
DB_ADDR=redis:6379
DB_PASSWORD=
APP_PORT=:3000
DOMAIN=localhost:3000
API_QUOTA=10
```

### 3. Run with Docker Compose (Recommended)
Spin up both the Redis instance and the Go microservice using Docker:
```bash
docker compose up --build
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 💡 API Endpoints

| Method | Endpoint | Description | Request Body / Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/:url` | Resolves short code and redirects to target URL | Path parameter: short code |
| **POST** | `/api/v1` | Creates a new short URL (with optional custom alias) | `{"url": "...", "short": "...", "expiry": 24}` |
