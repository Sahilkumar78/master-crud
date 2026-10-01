import dotenv from "dotenv";

import express from "express"
import { app } from "./app.js";
import connectDB from "./db/index.js";


dotenv.config();
app.get("/", (req, res) => {
    res.send("<h1> your stock market portfolio database is ready</h1>")
})

connectDB()
.then(() => {
     app.listen(process.env.PORT|| 8000, () => {
         console.log(`server is running at port: ${process.env.PORT}`);
     })
})
.catch((err) => {
   console.log("MongoDB connection fail !!", err);
      
})