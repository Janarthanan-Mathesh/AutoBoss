# AutoBoss - Auto Rickshaw Rental & Fleet Management System

A full-stack MERN application for managing auto rickshaw rentals, drivers, payments, maintenance, and analytics.

## Features
- Admin authentication with JWT
- CRUD operations for autos, drivers, rentals, payments, and maintenance
- Dashboard with analytics and charts
- Reports with CSV export
- EV analytics (optional)
- Responsive UI with Tailwind CSS

## Setup
1. Clone the repo.
2. Install dependencies: `npm install` in both backend and frontend folders.
3. Set up environment variables (e.g., MONGO_URI, JWT_SECRET, Cloudinary keys).
4. Start backend: `npm start` in backend folder.
5. Start frontend: `npm start` in frontend folder.
6. Register an admin via POST to /api/auth/register, then login.

## Deployment
- Backend: Deploy to Render or Heroku.
- Frontend: Deploy to Vercel.

## Notes
- For notifications, integrate with Twilio or similar.
- Add pagination and search in tables for better UX.
- Test thoroughly before production.