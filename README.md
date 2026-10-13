# Taisiya Style — website

Online booking site for a hair salon in Prague (Smíchov): services and prices, gallery, client accounts with loyalty points, and an admin panel. Installable as a PWA, available in English, Ukrainian and Czech.

**Live:** https://www.taisiiastyle.cz  
**Backend repository:** [taisiya-portfolio-backend](https://github.com/kuzmavasil74/taisiya-portfolio-backend)

## Features

**For clients**
- Online booking with live availability: 30-minute slots, working days Mon/Wed/Fri 9:00–20:00 (Europe/Prague); a service must fit into consecutive free slots
- 16 services plus package deals (e.g. cut + toning); prices and durations are loaded from the API
- Recurring bookings (every 1/2/4 weeks) and a waitlist when a day is fully booked
- Accounts: sign up / log in, a personal dashboard with upcoming and past bookings, cancel a booking
- Loyalty points (1 point per 100 CZK) and a referral program (both sides get a bonus after the friend's first booking)
- Telegram reminders (a day and an hour before the visit) through a per-booking link
- Reviews with ratings and a gallery with a before/after example
- GDPR: privacy policy, terms, marketing consent and self-service account deletion

**For the salon**
- Admin panel: users, all bookings (confirm / cancel / reschedule), statistics charts, review moderation
- A Telegram notification about every new booking in a group chat, with confirm/cancel buttons

**Platform**
- PWA: installable, offline fallback through a service worker, install prompt
- i18n: EN / UK / CZ (a test checks that the locale files have the same keys)
- Responsive, mobile-first layout; the burgundy brand palette and spacing live in one design-token file (`src/styles/styles.css`)

## Tech stack

React 18 · React Router 6 · i18next · CSS Modules · axios · react-datepicker · react-slick · Recharts · Create React App 5 · Jest + Testing Library

## Getting started

Requires Node.js 24 (see `engines` in `package.json`).

```bash
npm install
npm start          # http://localhost:3000
```

By default the app talks to the production API. To use a local backend, create `.env.local`:

```bash
REACT_APP_API_URL=http://localhost:4000
```

The backend already allows `http://localhost:3000` in CORS.

### Scripts

| Command | What it does |
| --- | --- |
| `npm start` | dev server with hot reload |
| `npm test` | unit tests (`npm test -- --watchAll=false` for a single run) |
| `npm run build` | production build into `build/` |

## Project structure

```
src/
  components/     Header, Footer, Modal, ConfirmModal, InstallPrompt
  pages/          one folder per route (Main, Booking, Gallery, Dashboard, AdminPanel, …)
  locales/        en / uk / cz translation.json
  styles/         global styles and design tokens
  utills/         API client (auth header, 401 handling), API URL config, useServices hook
public/
  sw.js           service worker
  manifest.json   PWA manifest
  images/         gallery photos, hero slider, social preview, printable booking QR code
```

## Photos

Gallery photos marked "Style example" are licensed stock images (Pexels), not the salon's own work. The hero slider also uses Pexels photos (free commercial licence).

## Deployment

- **Frontend:** Vercel, deployed on every push to `main` (Node 24; `.npmrc` sets `legacy-peer-deps=true`).
- **Backend:** Railway, see the backend repository.
- **CI:** GitHub Actions runs the tests and a production build on every push and pull request.
- `railway.json` is included in case the frontend has to be served from Railway (`serve -s build`).
