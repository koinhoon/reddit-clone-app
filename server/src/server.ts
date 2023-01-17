import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth"
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()
const origin = process.env.ORIGIN
const app = express();

app.use(express.json());
app.use(morgan("dev")); // dev, short, common, combined
app.use(cors({
    origin,
    credentials: true
}))

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes)
let port = 4000;

app.listen(port, async () => {
    console.log("server is running");

    AppDataSource.initialize().then(() => {
        console.log("db initialize")
    }).catch(e => console.log(e))
})