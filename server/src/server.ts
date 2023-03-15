import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import subRoutes from "./routes/subs";
import postRoutes from "./routes/posts";
import votesRoutes from "./routes/votes";
import userRoutes from "./routes/users"

dotenv.config()
const origin = process.env.ORIGIN
const app = express();

app.use(express.json());
app.use(morgan("dev")); // dev, short, common, combined
app.use(cookieParser())
app.use(express.static("public"))
app.use(cors({
    origin,
    credentials: true
}))
app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes)
app.use("/api/subs", subRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/votes", votesRoutes);
app.use("/api/users", userRoutes);
let port = 4000;

app.listen(port, async () => {
    console.log("server is running");

    AppDataSource.initialize().then(() => {
        console.log("db initialize")
    }).catch(e => console.log(e))
})