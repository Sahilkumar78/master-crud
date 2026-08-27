import dotenv from "dotenv"

import express from "express"
import connectDB from "./db/index.js";
import { app } from "./app.js";
// const app = express();
dotenv.config();
app.get("/", (req, res) => {
         res.send("<h1>your hospital database is ready</h1>")
})


connectDB()
.then(() => {
      // console.log(process.env.MONGODB_URI);
      
      app.listen(process.env.PORT || 8000, () => {
           
           console.log(`server is running at port: ${process.env.PORT}`);  
      })
})
.catch(err => {
       console.log(process.env.MONGODB_URI);
      console.log("mongodb connection fail !! ", err);
      
})
