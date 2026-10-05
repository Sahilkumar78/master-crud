import express from "express"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//routes

import eventRouter from "./routes/event.routes.js"

app.use("/api/v1/event", eventRouter);

// http://localhost:8000/api/v1/event/createevent (put)

export {app};