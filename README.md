# 🎮 TRAPPED — Dimension Trap: Jumanji Reborn

A cinematic, Hollywood-grade multiplayer survival-adventure web launcher and storefront for the game *Dimension Trap: Jumanji Reborn*. The platform handles authentication, 4-player team formation, dice-roll character assignment, 10-zone dimension progression, in-app monetization, and leaderboards — all wrapped in a dark, blockbuster-movie aesthetic.

---

## 🎥 Live Demo

![Demo](demo.gif)

🔗 Live Demo: https://dimension-trap-core.lovable.app

---

## 📌 Overview

Traditional game launchers feel like dull SaaS dashboards. TRAPPED is a premium cinematic portal that makes four friends feel like they're stepping into a Hollywood survival film before the 3D gameplay (built in Unreal Engine 5) even loads. The web app manages the entire pre-game and meta-game loop: split-screen portal login, team lobby, dice-roll character assignment, sequential zone progression, lives & ghost-mode tracking, Survivor Choice voting, Legend Badges, and the in-app revive store.

---

## 🚀 Features

🎬 Cinematic split-screen portal login & registration

🧑‍🤝‍🧑 4-player team formation via private invite code or global matchmaking

🎲 Jumanji-style dice roll character assignment (no manual picking)

🌀 10 sequential dimension zones — Horror Mansion → Final Boss Dimension

❤️ 3 lives per player per zone with Ghost / Spectator mode on elimination

🗳️ Survivor Choice voting restricted to alive players

🏅 Legend Badges with persistent gameplay modifiers

💰 In-app store for extra lives & Team Rescue Pack (INR pricing)

📊 Live leaderboards and persistent player progression

🎙️ Voice-acting hooks, proximity chat, and emergency HELP signal

🎨 Dark cinematic design system — blood-red, portal-green, photographic shadows

💻 Modern responsive interface, mobile and desktop

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or bun package manager
- Git

### Installation

Clone repository

```bash
git clone https://github.com/abiramisanthi/dimension-trap-core.git
cd dimension-trap-core
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open:

```bash
http://localhost:8080
```

---

## 📦 Project Structure

```plaintext
dimension-trap-core
│
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── TeamPage.tsx
│   │   ├── DimensionsPage.tsx
│   │   ├── DimensionPlayPage.tsx
│   │   ├── LeaderboardPage.tsx
│   │   └── StorePage.tsx
│   │
│   ├── components/
│   │   ├── CinematicAuthShell.tsx
│   │   ├── Navbar.tsx
│   │   └── ui/
│   │
│   ├── lib/
│   │   └── gameStore.ts
│   │
│   ├── assets/
│   ├── index.css
│   └── App.tsx
│
├── public/
├── TRAPPED_DEVELOPER_VISION.md
├── tailwind.config.ts
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🧠 Game Systems & Logic

### Core Gameplay Loop

- 4-player team assembly via invite code or matchmaking
- Randomized dice-roll character assignment with unique powers
- Sequential zone unlock — cannot skip ahead on first run
- 3 lives per player per zone; lives reset on team completion
- Ghost / Spectator mode for eliminated players with whisper hints
- Survivor Choice voting between zones (alive players only)

### Meta Systems

- Persistent Legend Badges with gameplay modifiers
- Auto-generated team movie-poster after each zone
- INR-based monetization: ₹149 (1 life), ₹399 (3 lives), ₹799 (Team Rescue)

---

## 📈 System Capabilities

| Feature | Status |
|---------|--------|
| Cinematic Auth Shell | ✅ |
| 4-Player Team Formation | ✅ |
| Dice-Roll Character Assignment | ✅ |
| 10-Zone Progression Tracker | ✅ |
| Lives & Ghost Mode Logic | ✅ |
| Survivor Choice Voting | ✅ |
| In-App Revive Store | ✅ |
| Leaderboard | ✅ |
| Persistent Player State | ✅ |

---

## 🔒 Safety & Integrity Features

- Sequential zone unlock prevents progression exploits
- Vote eligibility validation (alive players only)
- Persistent state hydration via Zustand middleware
- Role-based access patterns ready for Lovable Cloud RLS
- Responsive form validation via Zod schemas

---

## 🌟 Key Technologies

### Frontend
- React 18
- Vite 5
- TypeScript 5
- React Router

### Styling
- Tailwind CSS v3
- shadcn/ui
- HSL semantic design tokens
- Lucide React icons

### State Management
- Zustand (with persist middleware)

### UI Components
- Radix UI
- React Hook Form
- Zod

### Data Layer
- TanStack React Query

### Backend (Lovable Cloud / Supabase)
- PostgreSQL with Row-Level Security
- Authentication (email, Google, Apple)
- Edge Functions
- File storage

### Target Game Engine (external)
- Unreal Engine 5

### Deployment
- Lovable Cloud
- GitHub

---

## 🚀 Future Enhancements

📱 Native iOS & Android wrappers
🎮 Steam & Epic Games Store launcher integration
🎙️ Proximity voice chat via WebRTC
🤖 AI-generated photoreal avatars from user selfies
🎬 Auto-generated shareable team movie posters
🌍 Cross-region global matchmaking
💳 Razorpay & Stripe payment integration

---

## 📄 License

This project is licensed under the MIT License — see LICENSE for details.

---

## 👩‍💻 Author

**Abirami Karunakaran**

AI & ML Engineering Student

GitHub: https://github.com/abiramisanthi

---

## 💡 Elevator Pitch

Developed a cinematic Hollywood-grade web launcher for a 4-player survival game using React, TypeScript, Tailwind, and Zustand — featuring split-screen portal authentication, dice-roll character assignment, 10-zone progression tracking, in-app monetization, and a dark blockbuster aesthetic ready to plug into a UE5 game client.

---

## 🙏 Acknowledgments

shadcn/ui and Radix for accessible component primitives

Tailwind CSS for the semantic token design system

Lovable platform for build and hosting infrastructure

The Jumanji, Stranger Things, and The Last of Us creative teams for inspiration
