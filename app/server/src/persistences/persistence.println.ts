import * as Promise from "bluebird";
import {createReadStream, createWriteStream, mkdir, readdir, ReadStream, WriteStream, unlink, stat} from "fs";
import {BasePersistence} from "../classes/base/base-persistence";
import {ModelInterface} from "../interfaces/model.interface";

export class PersistencePrintln extends BasePersistence {

    constructor(private _prefix: string = '') {
        super();
    }

    protected _create(model: ModelInterface): Promise<boolean> {
        let modelData = model.toJSON();
        let id = modelData.id || this._getHashString(JSON.stringify(modelData));

        return new Promise((resolve) => {
            console.log(this._prefix, modelData);

            resolve(true);
        });
    }

    protected _fetchAll(): Promise<Array<any>> {
        return new Promise((resolve) => {
            console.log(this._prefix, 'Fetch attempt');

            resolve([
                {
                    id: 1,
                    name: "Item 1",
                    payload: "Println persistence 1 item"
                },
                {
                    id: 2,
                    name: "Item 2",
                    payload: "Println persistence 2 item"
                }
            ]);
        });
    }

    protected _fetch(id: string): Promise<any> {

        return new Promise((resolve) => {
            console.log(this._prefix, 'Fetch attempt on item ' + id);

            resolve({
                id: id,
                name: "Item " + id,
                payload: "Println persistence " + id + " item"
            });
        });
    }

    protected _update(id: string, model: ModelInterface): Promise<any> {
        return new Promise((resolve) => {
            console.log(this._prefix, 'Update attempt on item ' + id);

            (<any>model).id = id;

            resolve(model);
        });
    }

    protected _remove(id: string): Promise<boolean> {
        return new Promise((resolve) => {
            console.log(this._prefix, 'Deletion attempt on item ' + id);
            resolve(true);
        });

    }
}