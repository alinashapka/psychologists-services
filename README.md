## 🧠 Psychologists.Services

Find the right psychologist. Book appointments. Save your favorites.

A modern web application designed to help users quickly and easily find a psychologist that fits their needs.
Users can browse specialists, view detailed information, add psychologists to their favorites list, and book appointments directly through the platform.

This project is built using React, Redux Toolkit, and modern UI patterns to ensure smooth performance and a pleasant user experience.

## 🚀 Features

- **Browse psychologists** — List of specialists with name, avatar, specialization, experience, rating, price per hour, etc.
- **Favorites** — Add / remove psychologists to your favorites list. Favorites persist in Firebase per user.
- **Appointment booking** — Ability to create appointment requests.
- **Sorting / Filtering** — Sort psychologists by name (A–Z / Z–A), price, rating, etc.
- **Lazy loading / pagination** — Only a subset of psychologists is displayed at first, “Load more” button reveals more (for performance and better UX).
- **User authentication** — Favorites and booking available only to authenticated users.
- **Responsive design** — Works on wide desktop layout (1440 px) and adapts to smaller screens.

## 🔧 Installation & Setup

1️⃣ Clone the repository
git clone [https://github.com/yourusername/psychologists-services.git](https://github.com/alinashapka/psychologists-services.git)
cd psychologists-services

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev

4️⃣ Build for production
npm run build

## 📁 Project structure

/ (root)
├─ public/ # static public files (index.html, favicon, etc.)
├─ src/ # application source code
│ ├─ components/ # reusable UI components
│ ├─ pages/ # page-level components / routes
│ ├─ redux/ # Redux slices, thunks, store setup
│ ├─ services/ # 3rd-party integrations (e.g. Firebase config)
│ ├─ utils/ # utility functions (helpers, formatters, etc.)
│ ├─ App.jsx # root React component
│ └─ main.jsx # React entry point (render, Router, store provider)
├─ package.json
├─ README.md
└─ …

## 📦 Deployment

The project is deployed on Vercel.

Live demo is available at: https://psychologists-services-rouge.vercel.app

## 🔐 Security / Auth / State

Authentication handled through Firebase — only logged-in users can add favorites / book appointments.

Favorites are stored under user ID in Firebase: favorites/{userId}/{psychId}

Global state managed via Redux Toolkit (slices, selectors, async thunks) for predictable and maintainable state

## 👤 Author

Alina Shapka

- GitHub: [@alinashapka](https://github.com/alinashapka)
- LinkedIn: [Alina Shapka](https://www.linkedin.com/in/alina-shapka/)
- Email: alina.a.shapka@gmail.com
