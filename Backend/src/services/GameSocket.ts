import { Socket, SocketService, SocketSession, Input, Args, Emit, SocketUseAfter, IO, SocketUseBefore } from "@tsed/socketio";
import { InputEvents } from "../interfaces/InputEvents";
import * as jwt from 'jsonwebtoken'
import { Keys } from "../interfaces/Keys";
import { OutputEvents } from "../interfaces/OutputEvents";
import { ErrorHandlerSocketMiddleware } from "../middlewares/SocketMiddlewareError";
import { Dumb } from '../models/Dumb'
import { Inject } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { AuthMiddleware } from "../middlewares/AuthenticationMiddleware";
import { Authenticated } from "@tsed/common";

@SocketService('/')
@SocketUseBefore(AuthMiddleware)
@SocketUseAfter(ErrorHandlerSocketMiddleware)
export class GameSocket {
    private players: Map<string, Socket> = new Map<string, Socket>()
    @Inject(Dumb)
    private dumbModel: MongooseModel<Dumb>

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
    async sendMessage(
        @Args(0)
        message: any
    ): Promise<string> {
        let dumb:Dumb = new Dumb();
        dumb.name = "hello world";
        await this.dumbModel.create(dumb);
        return 'mensagem';
    }

    @Input(InputEvents.SEND_ATTACK)
    @Emit(OutputEvents.SEND_SUCCESS)
    @Authenticated()
    sendAttack(
        @Args(0)
        message: any
    ): string {

        return 'awadwdawdadsada';
    }
    
    @Authenticated()
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
        if (session.has('player')) {
            const player = session.get('player')
            this.players.delete(player.id)
        }
    }
}