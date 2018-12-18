import {BaseController} from "../classes/base/base-controller";
import * as express from "express";
import {GithubContentApiRepository} from "../repositories/github-content-api.repository";
import * as requestPromiseNative from "request-promise-native";
import * as showdown from "showdown";
import {DirectoryMongoRepository} from "../repositories/directory.mongo.repository";

export class DirectoryController extends BaseController {
    protected _endpoint: string = '/directory';
    protected _repository = new DirectoryMongoRepository();


    constructor(_router: express.Router) {
        super(_router);

        this._router.get(this._endpoint + '/:directoyId/:depth', (req: express.Request, res: express.Response): void => {

            // -1 means endless depth
            let depth: number = parseInt(req.params.depth, 10) || -1;

            this._repository
                .fetch(req.params.directoyId)
                .then((directories) => {
                    res.json(directories);
                });
        });

        this._router.get(this._endpoint, (req: express.Request, res: express.Response): void => {
            this._repository
                .fetchRoot()
                .then((directories) => {
                    res.json(directories);
                });
        });
    }
}
