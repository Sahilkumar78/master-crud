import {Router} from "express"
import { createDoctor, deleteDoctor,
     getAllDoctors, updateDoctor } 
     from "../controllers/Doctor.controller.js";

const router = Router();

router.route("/").get(getAllDoctors);
router.route("/createdoctor").post(createDoctor);
router.route("/:id").put(updateDoctor);
router.route("/:id").delete(deleteDoctor);


export default router;