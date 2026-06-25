# KSPXExams

KSPXExams is a responsive government exam portal built with React, Vite, and Firebase. It helps users discover exam notifications, browse categories, view results, download admit cards and answer keys, and access study resources. The project also includes an admin dashboard for managing all published content.

## Features

- Public exam listings with featured and trending notifications
- Category-based browsing and exam detail pages
- Search, calendar, results, admit cards, answer keys, and study resources sections
- Admin login and dashboard for content management
- Firebase Firestore integration for exams, categories, and content updates
- SEO-friendly pages and responsive UI
- Theme-aware interface with modern glassmorphism styling

## Tech Stack

- React 19
- Vite
- React Router
- Firebase Auth and Firestore
- Tailwind CSS
- ESLint

## Project Structure

- `src/pages` contains public pages and admin pages
- `src/components` contains shared layout and UI components
- `src/firebase` contains Firebase configuration and data services
- `src/context` contains auth and theme providers
- `src/hooks` contains reusable hooks

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Firebase Setup

The app uses Firebase for authentication and Firestore data.

1. Create a Firebase project.
2. Update `src/firebase/config.js` with your Firebase credentials.
3. Configure Firestore collections for exams, categories, results, admit cards, answer keys, and study resources.
4. Adjust Firebase security rules before deploying to production.

## Deployment Notes

The project is ready to deploy as a Vite app after the Firebase configuration is set up. If you host on Firebase Hosting, make sure the build output points to `dist`.

## Resume Description

Built KSPXExams, a React and Firebase based exam information portal for government job aspirants. Implemented a responsive public website with exam notifications, search, category browsing, results, admit cards, answer keys, and study resources, plus an admin dashboard for managing content through Firestore.
