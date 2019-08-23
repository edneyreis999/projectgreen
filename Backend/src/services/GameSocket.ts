import { Socket, SocketService, SocketSession, Input, Args, Emit, SocketUseAfter, IO, SocketUseBefore } from "@tsed/socketio";
import { InputEvents } from "../interfaces/InputEvents";
import * as jwt from 'jsonwebtoken'
import { Keys } from "../interfaces/Keys";
import { OutputEvents } from "../interfaces/OutputEvents";
import { ErrorHandlerSocketMiddleware } from "../middlewares/SocketMiddlewareError";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";

@SocketService('/')
@SocketUseBefore(AuthenticationMiddleware)
@SocketUseAfter(ErrorHandlerSocketMiddleware)
export class GameSocket {
    private players: Map<string, Socket> = new Map<string, Socket>()

    constructor(
        @IO
        io: SocketIO.Server
    ) {
        io.on('error', (error: Error) => {
            console.error(error)
        })
    }

    @Input(InputEvents.SEND_MESSAGE)
    @Emit(OutputEvents.SEND_SUCCESS)
    sendMessage(
        @Args(0)
        player: string,
        @Args(1)
        message: {
            command: string,
            data?: any
        }
    ): void {
        if (this.players.has(player)) {
            this.players.get(player).emit(OutputEvents.GAME_EVENT, message.command, {...message.data, timestamp: Date.now()})
        }
    }

    $onConnection(
        @Socket
        socket: SocketIO.Socket,
        @SocketSession
        session: SocketSession
    ): void {
        const { token } = socket.handshake.query

        const decoded = jwt.decode(token, Keys.JWT)

        if (decoded && !decoded.server && decoded.character) {
            session.set('player', decoded)
            session.set('authenticated', true)
            this.players.set(decoded.character, socket)
        } else if (decoded && !decoded.server) {
            session.set('authenticated', false)
            throw new Error('Invalid jwt')
        }
    }

    $onDisconnect(
        @SocketSession
        session: SocketSession
    ): void {
        console.log('conectoooou')
        console.log('player')
        console.log(session.get('player'))
        if (session.has('player')) {
            const player = session.get('player')
            this.players.delete(player.id)
        }
    }
}