import { SocketMiddleware, Args, SocketSession } from "@tsed/socketio";

@SocketMiddleware()
export class SocketAuthenticationMiddleware {
    use(
        @Args()
        args: any[],
        @SocketSession
        session: SocketSession
    ) {
        const authenticated = session.get('authenticated') as boolean
        if (!authenticated) {
            throw new Error('Server not authenticated')
        }
        return args
    }
}