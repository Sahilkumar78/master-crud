import { Router } from "express";
import { createWatchList, deleteWatchlist, getAllWatchlists, getWatchListById, updateWatchlist } from "../controllers/watchlist.controller.js";


const router = Router();

router.route("/").get(getAllWatchlists)
router.route("/createwatchlist").post(createWatchList)
router.route("/getwatchlistbyid/:id").get(getWatchListById);
router.route("/updatewatchlist/:id").put(updateWatchlist);
router.route("/deletewatchlist").delete(deleteWatchlist);


export default router;