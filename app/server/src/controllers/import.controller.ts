import * as express from "express";
import {Import} from "../classes/import";

export class ImportController {
    protected _endpoint: string = '/import';
    private imported: Date | null = null;

    constructor(private _router: express.Router) {
        // @ts-ignore
        this._router.get(this._endpoint + '/', (req: express.Request, res: express.Response): void => {
            if (!this.imported) {
                new Import(false)
                    .run()
                    .then((result) => {
                        this.imported = new Date();
                        res.json({completedAt: this.imported});
                    });
            } else {
                res.json(res.json({completedAt: this.imported}));
            }
        });
    }
}
