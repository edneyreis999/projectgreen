import { SocketMiddleware, Socket, Args, SocketSession } from "@tsed/socketio";
import { Unauthorized } from "ts-httpexceptions";


@SocketMiddleware()
export class AuthenticationMiddleware {
    use(
        @SocketSession
        session: SocketSession
    ) {
        if (!session.get('authenticated')) {
            throw new Unauthorized('Not authorized')
        }
    }
}