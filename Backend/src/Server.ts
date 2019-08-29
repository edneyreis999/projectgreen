import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from "@tsed/common";
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const rootDir = __dirname;

console.log(rootDir)

@ServerSettings({
    rootDir,
    //port: process.env.PORT,
    port: 8000,
    httpsPort: false,
    acceptMimes: ["application/json"],
    socketIO: {

    },
    
    mongoose: {
        url: process.env.MONGO_CONNECTION_URL,
        connectionOptions: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    },
    
    componentsScan: [
        `${rootDir}/services/**/*.ts`,
        `${rootDir}/middlewares/**/*.ts`,
        `${rootDir}/controllers/**/*.ts`,
        `${rootDir}/interfaces/**/*.ts`,
        `${rootDir}/models/**/*.ts`,
    ]
})
export class Server extends ServerLoader {
    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    public async $onMountingMiddlewares(): Promise<any | void> {

        this
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))

        return null;
    }
}