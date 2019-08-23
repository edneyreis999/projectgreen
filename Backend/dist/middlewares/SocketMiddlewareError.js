"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const socketio_1 = require("@tsed/socketio");
const OutputEvents_1 = require("../interfaces/OutputEvents");
let ErrorHandlerSocketMiddleware = class ErrorHandlerSocketMiddleware {
    use(eventName, error, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            socket.emit(OutputEvents_1.OutputEvents.ERROR, error.message);
        });
    }
};
__decorate([
    __param(0, socketio_1.SocketEventName), __param(1, socketio_1.SocketErr), __param(2, socketio_1.Socket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Error, Object]),
    __metadata("design:returntype", Promise)
], ErrorHandlerSocketMiddleware.prototype, "use", null);
ErrorHandlerSocketMiddleware = __decorate([
    socketio_1.SocketMiddlewareError()
], ErrorHandlerSocketMiddleware);
exports.ErrorHandlerSocketMiddleware = ErrorHandlerSocketMiddleware;
//# sourceMappingURL=SocketMiddlewareError.js.map