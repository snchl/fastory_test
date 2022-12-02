'use strict';
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
exports.init = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = __importDefault(require("./routes"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = hapi_1.default.server({
        port: process.env.PORT || 4000,
        host: '0.0.0.0',
    });
    server.route(routes_1.default);
    yield server.start();
});
exports.init = init;
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});
(0, exports.init)();
