import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbconnect from "./config/db.js";
import dns from "dns";
import router from "./routes/url.routes.js";

dns.setServers(["1.1.1.1","8.8.8.8"]);

dotenv.config();
const app = express();
dbconnect();

app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.use('/api',router);
app.use('/',router);

app.listen(port,()=>{
    console.log("Server is running on port",port);
})
