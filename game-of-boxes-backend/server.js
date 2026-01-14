import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connection } from "./src/config/db.js";

connection();

app.get("/", (req, res) => {
  res.send("WELCOME");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "SERVER_ERROR",
    message: "Something went wrong",
    status: 500,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Memory GameServer Running...!!");
});
