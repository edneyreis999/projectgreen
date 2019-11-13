import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware, GlobalErrorHandlerMiddleware } from "@tsed/common";
import '@tsed/swagger'
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require("express-session");

const rootDir = __dirname;

@ServerSettings({
    rootDir,
    //port: process.env.PORT,
    httpsPort: false,
    acceptMimes: ["application/json"],
    logger: {
        logRequest: false
    },
    socketIO: {
        
    },
    swagger: [
        {
            path: "/docs",
            doc: "rest",
            spec: {
                securityDefinitions: {
                    Bearer: {
                        type: 'apiKey',
                        name: 'x-auth-key-swagger',
                        in: 'header'
                    }
                },
                security: [
                    {
                        Bearer: []
                    }
                ]
            }
        }
    ],
    mongoose: {
        url: process.env.MONGO_CONNECTION_URL,
        connectionOptions: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    },
    mount: {
        '/api': '${rootDir}/controllers/**/*.ts'
    },
    componentsScan: [
        '${rootDir}/services/**/*.ts',
        '${rootDir}/middlewares/**/*.ts',
        '${rootDir}/controllers/**/*.ts',
        '${rootDir}/interfaces/**/*.ts',
        '${rootDir}/models/**/*.ts',
    ]
})
export class Server extends ServerLoader {
    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    public async $beforeRoutesInit(): Promise<any | void> {

        this
            .use(GlobalErrorHandlerMiddleware)
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(session({
                secret: "mysecretkey",
                resave: true,
                saveUninitialized: true,
                maxAge: 36000,
                cookie: {
                    path: "/",
                    httpOnly: true,
                    secure: false,
                    maxAge: null
                }
            }));

        return null;
    }
}