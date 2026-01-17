# AI Coding Agent Instructions for Reporit

Use these project-specific notes to be productive immediately.

## Architecture Overview

- Monorepo with two apps:
  - Backend: Node.js/Express + Mongoose (ESM) in [backend](../backend).
  - Frontend: React 19 + Vite + Tailwind v4 + React Router in [frontend](../frontend).
- ESM everywhere in backend (`"type": "module"`); imports must include file extensions (e.g., `../controllers/x.js`).
- Data model: `Transaction` schema in [backend/models/Transaction.js](../backend/models/Transaction.js).
- Current backend state: connects to MongoDB and logs all transactions via `allDocs()` in [backend/index.js](../backend/index.js); JSON parsing enabled and router mounted at `/api/transactions`; `CheckTransactionController` implemented with basic validation and risk scoring.

## Run & Dev Workflow

- Backend
  - Env: create [backend/.env](../backend/.env) with `MONGODB_URI=` and optional `PORT=`.
  - Install and run: from [backend](../backend)
    - `npm install`
    - `npm run dev` (nodemon; defaults to port 8000)
  - Add `app.use(express.json())` and CORS if the frontend will post JSON.
- Frontend
  - Install and run: from [frontend](../frontend)
    - `npm install`
    - `npm run dev` (Vite dev server)
  - Router mounted in [frontend/src/main.jsx](../frontend/src/main.jsx) using `BrowserRouter`; routes configured in [frontend/src/App.jsx](../frontend/src/App.jsx).

## Backend Conventions & Patterns

- ESM imports with explicit `.js` extensions. Example: `import { CheckTransactionController } from "../controllers/checkTransactionController.js"`.
- Folder roles:
  - [backend/db/connectDB.js](../backend/db/connectDB.js): `dotenv.config()` and `mongoose.connect(MONGODB_URI)`.
  - [backend/models/Transaction.js](../backend/models/Transaction.js): `Transaction` schema and model; exposes helper `allDocs()`.
  - [backend/routes/transactionRoutes.js](../backend/routes/transactionRoutes.js): Express router with `POST /verify` endpoint.
  - [backend/controllers/checkTransactionController.js](../backend/controllers/checkTransactionController.js): controller validates inputs, queries `Transaction`, and returns risk score.
- Suggested API surface:
  - Base path: `/api/transactions`.
  - Endpoint: `POST /api/transactions/verify` with JSON body `{ senderPhone, recipientPhone, amount, transactionType }`.
  - Controller contract: async `(req, res)` returning `{ ok: boolean, riskScore: number, reasons: string[] }`.
- Mounting example for [backend/index.js](../backend/index.js):

  ```js
  import express from "express";
  import cors from "cors"; // if needed
  import connectDb from "./db/connectDB.js";
  import transactionsRouter from "./routes/transactionRoutes.js";

  const app = express();
  app.use(express.json());
  app.use(cors()); // if frontend on different origin

  connectDb(process.env.MONGODB_URI);
  app.use("/api/transactions", transactionsRouter);

  app.listen(process.env.PORT || 8000);
  ```

## Frontend Conventions & Patterns

- Layout composed at page level: each page includes [Navbar](../frontend/src/components/Navbar.jsx), [Sidebar](../frontend/src/components/Sidebar.jsx), and a main content component.
  - Example: [frontend/src/pages/CheckTransactionPage.jsx](../frontend/src/pages/CheckTransactionPage.jsx) owns `isMobileMenuOpen` and passes to `Sidebar`; `Navbar` toggles it via `onMenuToggle`.
- UI built with Tailwind utility classes (Tailwind v4 via `@tailwindcss/vite`).
- Add API calls in [frontend/src/components/CheckForm.jsx](../frontend/src/components/CheckForm.jsx) submit handler; render results in [frontend/src/components/Results.jsx](../frontend/src/components/Results.jsx).
- For local dev, prefer a Vite proxy to avoid CORS:
  ```js
  // frontend/vite.config.js
  export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: { proxy: { "/api": "http://localhost:8000" } },
  });
  ```

## Integration Notes & Gotchas

- ESM imports require explicit `.js` extensions (e.g., controller import in routes).
- JSON body parsing and routes are already enabled in [backend/index.js](../backend/index.js); ensure this stays in place for new endpoints.
- Use a Vite proxy in dev to avoid CORS; for production/non-proxy scenarios, enable CORS on the server if needed.
- Ensure consistent exports: if router is default-exported (`export default transactionsRouter`), import it as a default.
- Mongoose v9 uses modern connection defaults; pass only the connection string in `mongoose.connect` (already done).

## Quick Examples

- Simple controller skeleton:
  ```js
  // backend/controllers/checkTransactionController.js
  export async function CheckTransactionController(req, res) {
    const { senderPhone, recipientPhone, amount, transactionType } = req.body;
    // TODO: validate inputs, query Transaction model, compute risk
    return res.json({ ok: true, riskScore: 0, reasons: [] });
  }
  ```
- Simple fetch on submit (frontend):
  ```js
  const resp = await fetch("/api/transactions/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      senderPhone,
      recipientPhone,
      amount,
      transactionType,
    }),
  });
  const data = await resp.json();
  ```
