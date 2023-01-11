import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json());
app.use(morgan("dev")); // dev, short, common, combined

app.get("/", (_, res) => res.send("running"));
let port = 4000;

app.listen(port, async () => {
    console.log("server is running");

    AppDataSource.initialize().then(() => {
        console.log("db initialize")
    }).catch(e => console.log(e))
})