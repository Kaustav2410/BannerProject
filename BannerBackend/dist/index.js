"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const v1_1 = __importDefault(require("./routes/v1"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
// Body Parsing Middleware
app.use(express_1.default.json());
app.use('/api/v1', v1_1.default);
app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
});
