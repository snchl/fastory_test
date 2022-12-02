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
const swapi_1 = __importDefault(require("../utils/swapi"));
exports.default = {
    search(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.query.search) {
                return h
                    .response('Missing search query params')
                    .code(400)
                    .message('Bad request');
            }
            const swapiRequests = [
                `/people?name=${request.query.search}`,
                `/films?title=${request.query.search}`,
                `/starships?name=${request.query.search}&model=${request.query.search}`,
                `/vehicles?name=${request.query.search}&model=${request.query.search}`,
                `/species?name=${request.query.search}`,
                `/planets?name=${request.query.search}`,
            ];
            const responses = yield Promise.all(swapiRequests.map((swapiRequest) => {
                swapi_1.default.fetchUrl(swapiRequest);
            }));
            return responses;
        });
    },
};
