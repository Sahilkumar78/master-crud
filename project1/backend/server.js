import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
   origin: "http://localhost:5173"
}))

connectDB();

app.use("/api/notes", notesRoutes);

// app.get("/", (req, res) => {
     
//      res.status(200).send("this is me")
     
// })

// localhost:5001/api/notes/getAllNotes

// middle ware

app.use((req, res, next) => {
     console.log("We got a request");
     next();
     
})

app.use((req , res) => {
     console.log("Request received", req.method, req.url);
     res.status(404).send("response not found");
     
})

app.listen(5001, () => {
    console.log("server is running at Port: 5001");
    
})