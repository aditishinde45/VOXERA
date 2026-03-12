import express from "express";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import ConnectToSocket from "./controllers/socketmanager.js";
import cors from "cors";
import { connect } from "node:http2";
import userRoutes from "./routes/usersroutes.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const app = express();
const server = createServer(app);
const io = ConnectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/user", userRoutes);

app.get("/home", (req, res) => {
    console.log(MONGO_URL);
});

const start = async () => {
    const connectionDb = await mongoose.connect(
        "mongodb+srv://aditishinde55:aditishinde55@voxeracluster.sechwcv.mongodb.net/database?appName=voxeraCluster"
    );

    console.log(`mongodb connected ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
        console.log("listining on port 8000");
    });
};

start();
