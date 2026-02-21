import 'dotenv/config';

import express from "express";
import router from './routers/routers.js';
import { errorHandler } from './config/errorHandler.js';
import cors from "cors";
import { auth } from '#lib/auth.js';
import { toNodeHandler } from 'better-auth/node';

const app = express();

app.use(cors({
  origin: "*", // en prod limita esto
  credentials: true
}));

app.use((req, res, next) => {
  if (req.originalUrl === "/api/v0/webhooks/stripe") {
    express.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});

app.use("/api/v0", router);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(errorHandler);

export default app;