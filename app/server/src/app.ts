import * as express from "express";
import {createServer, Server} from "http";
import * as debug from "debug";
import {InstanceLoader} from "./classes/instance-loader";
import {BaseController} from "./classes/base/base-controller";
import * as bodyParser from "body-parser";
import {existsSync, readFileSync, realpathSync} from "fs";

export class App {

    public cnf: any;
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

        this.cnf = config;

        this.server = createServer(this.app);
        this.router = express.Router();

        this.log.log = console.log.bind(console);

        this._applyEnvironmentVariables(this.cnf);

        this._loadControllers();

        this._run();
    }

    private _applyEnvironmentVariables(cnf: any) {
        if (!!cnf.db.mongo) {
            process.env.MONGO_HOST = cnf.db.mongo.host;
            process.env.MONGO_PORT = cnf.db.mongo.port;
            process.env.MONGO_DBNAME = cnf.db.mongo.dbname;

            let tokenFilePath = __dirname + '/../../../' + cnf.gitHubTokenFileName;

            if (existsSync(tokenFilePath)) {
                process.env.GITHUB_API_TOKEN = readFileSync(tokenFilePath, 'utf-8').replace(/\n/, '');
            } else {
                console.log('No github token file found @ ' + realpathSync(__dirname + '/../../../') + '/' + cnf.gitHubTokenFileName);
                console.log('You might run into github api rate limits');
            }

            process.env.GITHUB_CONTENT_API = `${cnf.gitHubApi}/repos/${cnf.userOrOrganisationName}/${cnf.repositoryName}/contents/${ cnf.contentRootFolder}?ref=${cnf.workingBranch}`;
            process.env.GITHUB_RAW_API = `${cnf.gitHubRaw}/${cnf.userOrOrganisationName}/${cnf.repositoryName}/${ cnf.workingBranch}/${ cnf.contentRootFolder}`;
        }
    }


    private loadController(controllerName: string) {

        let identifier = controllerName.replace(/Controller/, '').toLowerCase();
        let pathToFile = __dirname + '/controllers/' + identifier + '.controller';

        import(pathToFile).then((Controller: any) => {
            let controllerInstance: BaseController = InstanceLoader.getInstance(Controller, controllerName, this.router);

            if (!!controllerInstance.registerEndpoints) {
                controllerInstance.registerEndpoints();
            }

            this._applyRoutingOrLoadNextController();
        })

            .catch((error) => {
                console.log('Issues loading ' + controllerName + ':');
                console.log(error.message);
                this._applyRoutingOrLoadNextController();
            });
    }

    private _loadControllers() {
        this._controllers = [].concat(this.cnf.controllers);
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
        this.log.log('Server started on port ' + this.cnf.server.port);
        this.server.listen(this.cnf.server.port);
    }
}
