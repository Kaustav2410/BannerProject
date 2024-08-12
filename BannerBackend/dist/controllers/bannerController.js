"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBanner = exports.createBanner = exports.getBannerDetails = exports.getInfo = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const prisma = new client_1.PrismaClient();
const getInfo = (req, res) => {
    return res.status(200).json({ message: "API is live" });
};
exports.getInfo = getInfo;
const getBannerDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                message: "Banner id can't be null",
            });
        }
        const banner = yield prisma.banner.findUnique({ where: { id: id } });
        if (!banner) {
            return res.status(http_status_codes_1.default.NOT_FOUND).json({
                message: "Banner not found",
            });
        }
        return res.status(http_status_codes_1.default.OK).json({ banner });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.getBannerDetails = getBannerDetails;
const createBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, url, timer } = req.body;
        console.log(title, description, url, timer);
        if (!title || !description || !url || !timer) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                message: "All fields must be filled",
            });
        }
        if (description.length > 500) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                custommessage: "description length can't be more than 500 chars",
            });
        }
        const banner = yield prisma.banner.create({
            data: {
                title,
                description,
                url,
                timer: new Date(timer),
            },
        });
        return res.status(http_status_codes_1.default.CREATED).json({
            message: "New Banner successfully created",
            banner,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.createBanner = createBanner;
const updateBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, url, timer } = req.body;
        if (!id) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                message: "Id must be valid",
            });
        }
        if (description && description.length > 500) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                custommessage: "description length can't be more than 500 chars",
            });
        }
        const banner = yield prisma.banner.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                url,
                timer: new Date(timer),
            },
        });
        return res.status(http_status_codes_1.default.OK).json({
            message: "Banner details updated successfully",
            banner,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.updateBanner = updateBanner;
