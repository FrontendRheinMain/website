import * as express from "express";
import {createServer, Server} from "http";
import * as debug from "debug";
import {InstanceLoader} from "./classes/instance-loader";
import {BaseController} from "./classes/base/base-controller";
import * as bodyParser from "body-parser";

export class App {

    public config: any;
    public app: express.Application;
    public server: Server;
    public router: express.Router;

    public log = debug('server:log');

    private _controllers: string[];

    constructor(config: any) {

        console.log('NEWER VERSION 123');

        this.app = express();

        this.app.use(express.static(__dirname + '/../public'));
        this.app.use(bodyParser.json());

        this.config = config;

        this.server = createServer(this.app);
        this.router = express.Router();

        this.log.log = console.log.bind(console);

        this._applyEnvironmentVariables(this.config.db);

        this._loadControllers();

        this._run();
    }

    private _applyEnvironmentVariables(dbConfiguration: any) {
        if (!!dbConfiguration.mongo) {
            process.env.MONGO_HOST = dbConfiguration.mongo.host;
            process.env.MONGO_PORT = dbConfiguration.mongo.port;
            process.env.MONGO_DBNAME = dbConfiguration.mongo.dbname;
        }
    }


    private loadController(controllerName: string) {

        let identifier = controllerName.replace(/Controller/, '').toLowerCase();
        let pathToFile = __dirname + '/controllers/' + identifier + '.controller';

        import(pathToFile).then((Controller: any) => {
            let controllerInstance: BaseController = InstanceLoader.getInstance(Controller, controllerName, this.router);

            controllerInstance.registerEndpoints();

            this._applyRoutingOrLoadNextController();
        })

            .catch((error) => {
                console.log('Issues loading ' + controllerName + ':');
                console.log(error.message);
                this._applyRoutingOrLoadNextController();
            });
    }

    private _loadControllers() {
        this._controllers = [].concat(this.config.controllers);
        this.loadController(this._controllers.pop());
    }

    private _applyRoutingOrLoadNextController() {
        if (this._controllers.length > 0) {
            return this.loadController(this._controllers.pop());
        } else {
            this.app.use(this.router);
        }
    }

    private _run() {
        this.log.log('Server started on port ' + this.config.server.port);
        this.server.listen(this.config.server.port);
    }
}