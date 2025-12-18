import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connection } from "./src/config/db.js";

connection();


app.get("/", (req, res) => {
    res.send("WELCOME");
  });
  

app.listen(process.env.PORT || 5000 ,() => {
    console.log("Memory GameServer Running...!!")
})