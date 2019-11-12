import { Service, Inject } from "@tsed/di";
import Agenda = require("agenda");
import { MongooseService } from "@tsed/mongoose";

const agenda = new Agenda();

@Service()
export class AgendaService {
    constructor(
        @Inject(MongooseService) private mongooseService: MongooseService
        // VC NAO PODE FAZER INJECAO DE UMA COISA Q JA INJETA A AGENDA, EX: SE O GAMESOCKET INJETA O AGENDASERVICE, NO AGENDA SERVICE VC NAO PODE INJETAR O GAMESOCKET
    ) {
    }

    public $afterRoutesInit() {
        this.start();
    }

    async start(): Promise<void> {
        agenda.mongo(this.mongooseService.get().connection.db, 'jobs')

        agenda.on('ready', async () => {
            agenda.define("NOME DO EVENTO", async (job: Agenda.Job<Agenda.JobAttributes>, done: Function) => {
                try {

                    // await job.remove() <------------- RECOMENDACAO PRA NAO LOTAR DE JOB A COLLECTION
                    done()
                } catch (error) {
                    console.error(error) // <--------------- RECOMENDACAO PRA DEBUGAR QDO TIVER DANDOE RRO
                    done(error) // <---- IMPORTANTE PRA REGISTRAR O ERRO DIRETO NO JOB QDO FALHAR ALGO
                }
            })

            // agenda.every('15 minutes', AgendaEvents.SERVER_SAVE, null, {
            //     skipImmediate: true
            // }); 
            //               EXEMPLO DE UM JOB Q VAI RODAR A CADA 15 MINUTOS, VC TEM Q REGISTRAR ESSE JOB COM O DEFINE TAMBEM IGUAL FEITO LA EM CIMA

            await agenda.start()
        })
    }
}

export { agenda }; // <----- IMPORTANTE PRA VC N TER O PROBLEMA DE INJECAO Q FALEI LA EM CIMA
