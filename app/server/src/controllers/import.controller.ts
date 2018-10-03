import {BaseController} from "../classes/base/base-controller";
import {ExampleMongoRepository} from "../repositories/example.mongo.repository";
import * as express from "express";
import * as showdown from "showdown";

export class ImportController {
    protected _endpoint: string = '/import';

    // protected _repository = new ExampleMongoRepository();

    constructor(private _router: express.Router) {
        //  super(_router);

        // @ts-ignore
        // this.converter = new showdown.Converter({metadata: true});
        this._router.get(this._endpoint + '/', (req: express.Request, res: express.Response): void => {

        });



        // Fetch the index Root specifie in the configuration apllied global in app.ts
        // First request in content controller but nicer please

        // Iterate and fetch all objects in there (special rules apply inside th config and reuse it!!!9
        //  second item in content controller


        //



    }
}
