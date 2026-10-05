import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/event.controller";

const router = Router();



router.route("/").get(getAllEvents);
router.route("/createevent").post(createEvent);
router.route("/geteventbyid/:id").get(getEventById);
router.route("/updateevent/:id").put(updateEvent);
router.route("/deleteevent/:id").delete(deleteEvent);


export default router