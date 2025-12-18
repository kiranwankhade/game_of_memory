import express from "express"
import cors from "cors"

import helmet from "helmet"
import { limiter } from "./middleware/rateLimit.middleware.js"

import authRoutes from "./routes/auth.routes.js"
import gameRoutes from "./routes/game.routes.js"
import leaderBoardRoutes from "./routes/leaderboard.routes.js"

const app = express()

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);

app.use("/auth",authRoutes);
app.use("/game",gameRoutes);
app.use("/leaderboard",leaderBoardRoutes);

export default app;