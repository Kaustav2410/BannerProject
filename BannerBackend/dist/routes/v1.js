"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", controllers_1.BannerController.getInfo);
router.get("/:id", controllers_1.BannerController.getBannerDetails);
router.post("/create", controllers_1.BannerController.createBanner);
router.patch("/:id", controllers_1.BannerController.updateBanner);
exports.default = router;
