import { Router } from "express"
import { createStock, deleteStock, getAllStocks, getStockById, updateStock } from "../controllers/stock.controller.js";


const router = Router();

console.log(getAllStocks);

router.route("/").get(getAllStocks);
router.route("/createstock").post(createStock);
router.route("/getstockbyid/:id").get(getStockById);
router.route("/updatestock/:id").put(updateStock);
router.route("/deletestock/:id").delete(deleteStock);

export default router;