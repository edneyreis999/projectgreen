"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const redisAdapter = require("socket.io-redis");
const rootDir = __dirname;
let Server = class Server extends common_1.ServerLoader {
    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    $onMountingMiddlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            this
                .use(common_1.GlobalAcceptMimesMiddleware)
                .use(cookieParser())
                .use(compress({}))
                .use(methodOverride())
                .use(bodyParser.json())
                .use(bodyParser.urlencoded({
                extended: true
            }));
            return null;
        });
    }
};
Server = __decorate([
    common_1.ServerSettings({
        rootDir,
        port: process.env.PORT,
        httpsPort: false,
        acceptMimes: ["application/json"],
        socketIO: {
            adapter: redisAdapter(process.env.REDIS_CONNECTION_URL)
        }
    })
], Server);
exports.Server = Server;
//# sourceMappingURL=server (2).js.map