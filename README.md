# Reporit – Community Fraud Detection

Reporit is a two-app mono‑repo that helps people quickly check transaction risk, report suspected fraud numbers, and view community analytics.

## Overview

- Backend: Node.js/Express (ESM) + Mongoose, REST API
- Frontend: React 19 + Vite + Tailwind v4 + React Router
- Database: MongoDB (Atlas or local)

## Repo Structure

```
backend/               # Express API
	index.js             # App bootstrap + routes
	db/connectDB.js      # dotenv + mongoose connect
	models/Transaction.js
	models/FraudReport.js
	controllers/
		checkTransactionController.js
		reportFraudController.js
		analyticsController.js
	routes/
		transactionRoutes.js
		reportRoutes.js
		analyticsRoutes.js

frontend/              # React + Vite app
	src/
		main.jsx           # BrowserRouter
		App.jsx            # Routes
		components/
			CheckForm.jsx    # Check transaction form
			ReportForm.jsx   # Report fraud form
			AnalyticsDashboard.jsx
			Navbar.jsx, Sidebar.jsx, Results.jsx
		pages/
			CheckTransactionPage.jsx
			ReportFraudPage.jsx
			AnalyticsPage.jsx
			AlertsPage.jsx
```

## Quick Start

1. Backend

```bash
cd backend
npm install
npm run dev
```

Create `.env` in `backend/`:

```
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
# or local
DATABASE_URL=mongodb://127.0.0.1:27017/transactions
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Dev proxy (already configured) forwards `/api` to the backend.

## API

Base path: `/api`

- Transactions
  - POST `/api/transactions/verify`
  - Request body:
    ```json
    {
      "senderPhone": "0244123456",
      "recipientPhone": "0551234567",
      "amount": 1500,
      "transactionType": "mobile_money"
    }
    ```
  - Response:
    ```json
    {
      "ok": true,
      "riskScore": 32,
      "reasons": ["Recipient appears in prior transactions"]
    }
    ```

- Fraud Reports
  - POST `/api/reports/submit`
  - Request body:
    ```json
    {
      "fraudNumber": "0551234567",
      "details": "Posed as bank agent",
      "reporterPhone": "0244123456"
    }
    ```
  - Response:
    ```json
    { "ok": true, "id": "<mongoId>" }
    ```

- Analytics
  - GET `/api/analytics/summary`
  - Response:
    ```json
    {
      "totalTransactions": 120,
      "avgAmount": 245.72,
      "highAmountCount": 9,
      "fraudReports": 14,
      "topRecipients": [
        { "phone": "0559038127", "name": "Akosua Darko", "count": 3 }
      ],
      "recentReports": [{ "date": "2026-01-11", "count": 2 }]
    }
    ```

## Frontend Usage

- Check: open “Check Transaction” page, submit the form; the result card shows `riskScore` and `reasons`.
- Report: open “Report Fraud”, submit number + details; a success banner confirms submission.
- Analytics: see KPIs, transaction composition donut, 7‑day reports sparkline, and top recipients.

## Conventions & Gotchas

- Backend uses ESM; imports require explicit `.js` extensions (e.g., controllers in routes).
- Enable JSON parsing in the server via `app.use(express.json())` (already set).
- In dev, Vite proxies `/api` → `http://localhost:8000`; for production or non‑proxy scenarios, enable CORS on the backend.
- Mongoose v9: simply pass the connection string to `mongoose.connect(MONGODB_URI)`.
- Validate inputs: amount must be a number > 0; phone numbers are trimmed.

## Test with curl

```bash
curl -X POST http://localhost:8000/api/transactions/verify \
	-H "Content-Type: application/json" \
	-d '{"senderPhone":"0244123456","recipientPhone":"0551234567","amount":1500,"transactionType":"mobile_money"}'

curl -X POST http://localhost:8000/api/reports/submit \
	-H "Content-Type: application/json" \
	-d '{"fraudNumber":"0551234567","details":"Posed as bank agent"}'

curl http://localhost:8000/api/analytics/summary
```

## License

MIT (or add your preferred license)
