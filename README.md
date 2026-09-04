# Smart Agriculture Copilot 🌱🌾

> **Smarter Farming. Better Harvests.**  
> An AI-powered full-stack smart farming intelligence platform providing crop suitability recommendations, real-time soil & weather analytics, plant disease diagnosis, market price tracking & AI prediction, government scheme discovery, and multilingual voice assistance.

---

## 🌟 Key Features

1. **AI Crop Recommendation Engine**: Matches soil NPK, pH, moisture, rainfall, temperature, season, and location with 50+ crops, providing yield estimates and fertilizer recommendations.
2. **Plant Disease Doctor**: Photo diagnosis of plant leaf infections (fungal, bacterial, pests) with symptoms, causes, organic & chemical treatments, and prevention guidelines.
3. **AGMARKNET Live Mandi Prices**: Real-time market prices across Indian states and districts, highlighting the "Best Market Near You" based on distance and payout ratios.
4. **AI Market Price Prediction**: 7, 15, and 30-day price trend forecasting with automated **BUY / SELL / HOLD** recommendations.
5. **Soil Health & IoT Telemetry**: Soil fertility index calculation, nutrient status gauges, and simulation mode for live IoT soil sensor nodes.
6. **Micro-Climate Weather Dashboard**: Real-time temperature, humidity, rain probability, 7-day forecast, and automated agronomic spraying/irrigation advisories.
7. **Multilingual & Voice Copilot**: Hands-free voice assistant supporting **English**, **Hindi (हिंदी)**, and **Bengali (বাংলা)** via Web Speech API.
8. **Government Schemes Directory**: Central & State schemes (PM-KISAN, PMFBY, AIF, Soil Health Card) with eligibility filters and direct application links.
9. **Farmer Portfolio Management**: Multi-farm block tracking, crop status timelines, planting dates, and farm health scores.

---

## 🏗️ Tech Stack

- **Frontend**: React.js 18 + Vite, Tailwind CSS, Lucide React icons, Recharts data visualization.
- **Backend**: Node.js + Express.js REST API, JWT Authentication, Multer file processing, CORS.
- **Database & ORM**: PostgreSQL + Prisma ORM (includes automatic standalone fallback mode for instant demonstration without database prerequisites).
- **APIs & AI Architecture**: OpenWeather API, AGMARKNET Mandi rates, Rule-ML hybrid crop and disease inference services.

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

---

### Option A: Run Full Stack Together (Root Directory)

1. **Install Dependencies**:
   ```bash
   npm run install:all
   ```

2. **Start Client & Server Concurrently**:
   ```bash
   npm run dev
   ```
   - **Frontend**: `http://localhost:5173`
   - **Backend API**: `http://localhost:5000`

---

### Option B: Run Client & Server Separately

#### 1. Backend Server Setup (`server/`)
```bash
cd server
npm install
npm run dev
```
*The Express backend server runs on `http://localhost:5000`.*

#### 2. Frontend React Setup (`client/`)
```bash
cd client
npm install
npm run dev
```
*The Vite React app runs on `http://localhost:5173`.*

---

## 🔐 Environment Variables Configuration

Create `.env` files in `server/` and `client/` if using custom environment parameters:

### `server/.env`
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=smart_agriculture_copilot_super_secret_jwt_key_2026
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smartagridb?schema=public"
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### `client/.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔑 Demo Login Options

- **One-Click Guest Demo**: Click the **"One-Click Guest Demo Login"** button on the sign-in page.
- **Sample Credentials**:
  - **Email**: `farmer@demo.com`
  - **Password**: `password123`

---

## 📡 API Endpoint Overview

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Register new farmer account |
| **Auth** | `POST` | `/api/auth/login` | Authenticate farmer & issue JWT |
| **Auth** | `GET` | `/api/auth/me` | Fetch authenticated profile info |
| **Crops** | `POST` | `/api/crops/recommend` | Rule-ML top crop suitability recommendation |
| **Disease** | `POST` | `/api/disease/predict` | Plant leaf diagnosis & treatment plan |
| **Weather** | `GET` | `/api/weather?location=...` | Live 7-day weather & agricultural advisory |
| **Soil** | `POST` | `/api/soil/readings` | Submit IoT soil sensor reading |
| **Soil** | `GET` | `/api/soil/readings/:farmId` | Get historical soil telemetry |
| **Market** | `GET` | `/api/market?crop=...&state=...` | AGMARKNET mandi commodity rates |
| **Market** | `POST` | `/api/market/predict` | AI price prediction (7/15/30 days) |
| **Farms** | `GET` | `/api/farms` | List authenticated farmer's farms |
| **Farms** | `POST` | `/api/farms` | Register new farm entry |
| **Farms** | `PUT` | `/api/farms/:id` | Update farm details |
| **Farms** | `DELETE`| `/api/farms/:id` | Delete farm entry |

---

## 📁 Project Structure

```
Smart Agriculture Copilot/
├── package.json                # Root concurrent scripts
├── README.md                   # Setup documentation
├── client/                     # Vite React Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Sidebar, Footer, VoiceAssistant, Cards, Gauges
│   │   ├── context/            # AuthContext, LanguageContext, ThemeContext, ToastContext
│   │   ├── pages/              # Home, Dashboard, CropRec, Disease, Weather, Market, Schemes, MyFarm, Soil
│   │   ├── locales/            # en.json, hi.json, bn.json
│   │   └── services/           # Axios API client
│   └── vite.config.js
└── server/                     # Node.js + Express Backend
    ├── prisma/                 # schema.prisma & seed.js
    └── src/
        ├── controllers/        # Auth, Weather, Crop, Disease, Market, Soil, Schemes, Farms
        ├── middleware/         # Auth JWT verification middleware
        ├── routes/             # Express API routes
        └── services/           # Crop recommendation & Disease detection services
```
