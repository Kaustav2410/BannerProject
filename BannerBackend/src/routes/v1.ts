import { BannerController } from "../controllers";
import express from "express";

const router = express.Router();

router.get("/",BannerController.getInfo);
router.get("/:id", BannerController.getBannerDetails);
router.post("/create", BannerController.createBanner);
router.patch("/:id", BannerController.updateBanner);

export default router;
