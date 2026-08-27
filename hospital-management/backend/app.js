import express from "express";

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))

import patientRouter from "./routes/patientRoutes.js"
import appointmentRouter from "./routes/appointmentRoutes.js"
import doctorRouter from "./routes/doctorRoutes.js"


app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/doctor", doctorRouter);



export {app};