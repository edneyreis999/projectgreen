import { Socket, SocketErr, SocketEventName, SocketMiddlewareError } from "@tsed/socketio";
import { OutputEvents } from "../interfaces/OutputEvents";

@SocketMiddlewareError()
export class ErrorHandlerSocketMiddleware {
    async use(@SocketEventName eventName: string, @SocketErr error: Error, @Socket socket: Socket) {
        socket.emit(OutputEvents.ERROR, error.message);
    }
}