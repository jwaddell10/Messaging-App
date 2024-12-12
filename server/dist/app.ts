"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || "3000";
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, helmet_1.default)());
//need to setup passport and sessions//
app.use("/auth", auth_1.default);
app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Hello, this is Express + TypeScript");
});
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});
