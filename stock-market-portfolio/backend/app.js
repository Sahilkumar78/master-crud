import express from "express"
import cors from "cors"
const app = express();

// console.log(app);
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))


// routes
import stockRouter from "./routes/stockRoutes.js"
import watchlistRouter from "./routes/watchlistRoutes.js"


app.use("/api/v1/stock", stockRouter);
app.use("/api/v1/watchlist", watchlistRouter);
// http://localhost:8000/api/v1/stock/createstock


export {app};
