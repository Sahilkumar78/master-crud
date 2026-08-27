import {Router} from "express"
import { addPatient, deletePatient, getPatient, updatePatient } from "../controllers/Patient.controller.js";

const router = Router();

router.route("/").get(getPatient);
router.route("/addpatient").post(addPatient);
router.route("/:id").put(updatePatient);
router.route("/:id").delete(deletePatient);

export default router;


