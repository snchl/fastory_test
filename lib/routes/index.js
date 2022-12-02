"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Search_1 = __importDefault(require("../repositories/Search"));
const routes = [
    {
        path: '/search',
        method: ['GET'],
        handler: Search_1.default.search
    },
];
exports.default = routes;
