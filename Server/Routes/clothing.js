"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const clothing_1 = require("../controllers/clothing");
router.get('/', clothing_1.DisplayClothingListPage);
router.get('/edit/:id', clothing_1.DisplayEditPage);
//# sourceMappingURL=clothing.js.map