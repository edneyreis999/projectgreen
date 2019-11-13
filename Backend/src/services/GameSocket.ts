import { Socket, SocketService, SocketSession, Input, Args, Emit, SocketUseAfter, IO, SocketUseBefore } from "@tsed/socketio";
import { InputEvents } from "../interfaces/InputEvents";
import * as jwt from 'jsonwebtoken'
import { Keys } from "../interfaces/Keys";
import { OutputEvents } from "../interfaces/OutputEvents";
import { ErrorHandlerSocketMiddleware } from "../middlewares/SocketMiddlewareError";
import { SocketAuthenticationMiddleware } from "../middlewares/SocketAuthenticationMiddleware";
import { Account } from "../models/Account";
import { model, Document } from "mongoose";
import { Home } from "../models/Home";
import { EBuildingType, StaticBuilding, IWarehouseProgress, IStoreProgress, IFactoryProgress } from "../models/StaticData/StaticBuilding";
import { Building } from "../models/Building";
import { Tile } from "../models/Tile";
import { agenda } from "./AgendaService";

@SocketService('/game')
@SocketUseBefore(SocketAuthenticationMiddleware)
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

    @Input(InputEvents.GET_PLAYER)
    @Emit(OutputEvents.SEND_SUCCESS)
    async getPlayer(
        @Args(0) playerId: any
    ): Promise<Account> {
        const AccountModel = model('Account');
        let player = await AccountModel.findById(playerId) as Account & Document;
        player = await player.populate('homes').execPopulate();

        return player;
    }

    @Input(InputEvents.SEND_SELECT_CITY)
    @Emit(OutputEvents.SEND_CITY_SELECTED_SUCCESSFULLY)
    async selectCity(
        @SocketSession session: SocketSession,
        @Args(0) cityId: string
    ): Promise<Home> {
        console.log('-------- cityId ---------')
        console.log(cityId)
        // exemplo de uso da agenda?
        // await agenda.schedule(new Date(), "NOME DO EVENTO", {
        // DADOS: DADOS // pode inserir qlqer porra aqui, ele vai ficar dentro de job.attrs.data.SUASCOISAS na hora de processar na agenda   
        //})
        const CityModel = model('City');
        let city = await CityModel.findById(cityId);
        if(!city){
            throw new Error(`City ${cityId} does not exists!!`);
        }
        
        const HomeModel = model('Home');
        let home = await HomeModel.findOne({city: cityId}) as Home & Document;
        const sessionPlayer = session.get('player') as Account;

        if(!home){
            home = new HomeModel() as Home & Document;
            home.city = cityId;
            home.account = sessionPlayer._id;
            home.gold = 100000;
            home = await home.save();
        }
        const homeObject = home.toObject()
        session.set('playerHome', homeObject)
        return homeObject;
    }

    @Input(InputEvents.UPGRADE_BUILDING)
    @Emit(OutputEvents.SEND_SUCCESS)
    async updateBuilding(
        @SocketSession session: SocketSession,
        @Args(0) buildingId: string
    ): Promise<Building> {
        const HomeModel = model('Home');
        const StaticDataModel = model('StaticBuilding')
        const playerHome = session.get('playerHome') as Home;

        let home  = await HomeModel.findById(playerHome._id) as Home & Document;
        if(!home){
            throw new Error(`Home ${playerHome._id} Not Found!`)
        }
        home = await home.populate('buildings').execPopulate();
        let building = home.buildings.find(home => {
            return home.id === buildingId
        })
        if(!building){
            throw new Error(`Building ${buildingId} Not Found!`)
        }

        const staticBuilding = await StaticDataModel.findOne({searchCode: building.type.toString()}).lean().exec() as StaticBuilding
        if(!staticBuilding){
            throw new Error(`search code '${building.type.toString()}' can't be found on static data`)
        }
        const currentBuildingProgress = staticBuilding.progress[building.level]
        const nextBuildingProgress = staticBuilding.progress[building.level + 1]
        if(!nextBuildingProgress){
            throw new Error(`Building can't be updated!`)
        }

        home.spendGold(nextBuildingProgress.cost);

        // ao invés de dar ++ no level... agendar um serviço de upgrade de acordo com o progress
        building.level ++;

        building.save();
        home.save();

        return building.toObject();
    }

    @Input(InputEvents.GET_HOME)
    @Emit(OutputEvents.SEND_SUCCESS)
    async getHome(
        @Args(0) homeId: string
    ): Promise<Home> {
        const HomeModel = model('Home');
        let home = await HomeModel.findById(homeId) as Home & Document;
        if(!home){
            throw new Error(`Home ${homeId} Not Found!`)
        }
        home = await home.populate('buildings').execPopulate();
        
        return home.toObject();
    }

    @Input(InputEvents.SEND_BUY_TILE)
    @Emit(OutputEvents.SEND_SUCCESS)
    async buyTile(
        @SocketSession
        session: SocketSession,
        @Args(0) tileId: string
    ): Promise<Home> {
        const TileModel = model('Tile');
        const HomeModel = model('Home');
        const BuildingModel = model('Building');

        const sessionPlayer = session.get('player') as Account;
        const playerHome = session.get('playerHome') as Home;

        if(!playerHome){
            throw new Error('Need to call \'send.selectCity\' before')
        }

        try {
            const promises = await Promise.all([HomeModel.findById(playerHome._id), TileModel.findById(tileId)])
            let home = promises[0] as Home & Document;
            let tile = promises[1] as Tile & Document;

            if (!home) {
                throw new Error(`Home not found for player ${sessionPlayer._id}`);
            }
            if (!tile) {
                throw new Error(`TileId ${tileId} Not Found`)
            }
            if(tile.home){
                throw new Error(`Tile already belongs to a player!`)
            }

            home.gold = home.spendGold(tile.price);

            let factory = new BuildingModel() as Building & Document;
            factory.home = home.id;
            factory.type = EBuildingType.FACTORY;
            factory.level = 1;
            
            let store = new BuildingModel() as Building & Document;
            store.home = home;
            store.type = EBuildingType.STORE;
            store.level = 1;
            
            let warehouse = new BuildingModel() as Building & Document;
            warehouse.home = home;
            warehouse.type = EBuildingType.WAREHOUSE;
            warehouse.level = 1;
            
            await factory.save();
            await store.save();
            await warehouse.save();

            tile.home = home.id;
            
            await tile.save();
            await home.save();
            return home.toObject();
        } catch (e) {
            throw new Error(e);
        }
    }

    $onConnection(
        @Socket
        socket: SocketIO.Socket,
        @SocketSession
        session: SocketSession
    ): void {
        const { token } = socket.handshake.query;
        const decoded = <Account>jwt.verify(token, Keys.SOCKET)

        if (decoded) {
            session.set('player', decoded)
            session.set('authenticated', true)
            this.players.set(decoded._id, socket)
        } else if (decoded) {
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