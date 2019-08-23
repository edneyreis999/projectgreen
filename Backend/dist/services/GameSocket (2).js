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
Object.defineProperty(exports, "__esModule", { value: true });
const socketio_1 = require("@tsed/socketio");
const InputEvents_1 = require("../interfaces/InputEvents");
const jwt = require("jsonwebtoken");
const Keys_1 = require("../interfaces/Keys");
const OutputEvents_1 = require("../interfaces/OutputEvents");
const SocketMiddlewareError_1 = require("../middlewares/SocketMiddlewareError");
const AuthenticationMiddleware_1 = require("../middlewares/AuthenticationMiddleware");
let GameSocket = class GameSocket {
    constructor(io) {
        this.players = new Map();
        io.on('error', (error) => {
            console.error(error);
        });
    }
    sendMessage(player, message) {
        if (this.players.has(player)) {
            this.players.get(player).emit(OutputEvents_1.OutputEvents.GAME_EVENT, message.command, Object.assign({}, message.data, { timestamp: Date.now() }));
        }
    }
    $onConnection(socket, session) {
        const { token } = socket.handshake.query;
        const decoded = jwt.decode(token, Keys_1.Keys.JWT);
        if (decoded && !decoded.server && decoded.character) {
            session.set('player', decoded);
            session.set('authenticated', true);
            this.players.set(decoded.character, socket);
        }
        else if (decoded && !decoded.server) {
            session.set('authenticated', false);
            throw new Error('Invalid jwt');
        }
    }
    $onDisconnect(session) {
        if (session.has('player')) {
            const player = session.get('player');
            this.players.delete(player.id);
        }
    }
};
__decorate([
    socketio_1.Input(InputEvents_1.InputEvents.SEND_MESSAGE),
    socketio_1.Emit(OutputEvents_1.OutputEvents.SEND_SUCCESS),
    __param(0, socketio_1.Args(0)),
    __param(1, socketio_1.Args(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GameSocket.prototype, "sendMessage", null);
__decorate([
    __param(0, socketio_1.Socket),
    __param(1, socketio_1.SocketSession),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameSocket.prototype, "$onConnection", null);
__decorate([
    __param(0, socketio_1.SocketSession),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GameSocket.prototype, "$onDisconnect", null);
GameSocket = __decorate([
    socketio_1.SocketService('/'),
    socketio_1.SocketUseBefore(AuthenticationMiddleware_1.AuthenticationMiddleware),
    socketio_1.SocketUseAfter(SocketMiddlewareError_1.ErrorHandlerSocketMiddleware),
    __param(0, socketio_1.IO),
    __metadata("design:paramtypes", [Object])
], GameSocket);
exports.GameSocket = GameSocket;
//# sourceMappingURL=GameSocket (2).js.map