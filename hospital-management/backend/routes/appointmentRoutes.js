import {Router} from "express";
import { createAppointment, deleteAppointment, getAllAppointments, updateAppointment } from "../controllers/Appointments.controller";

const router = Router();

router.route("/").get(getAllAppointments);
router.route("/createappointment").post(createAppointment);
router.route("/:id").put(updateAppointment);
router.route("/:id").delete(deleteAppointment);

export default router;