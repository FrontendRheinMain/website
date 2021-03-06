import {createHash} from "crypto";
import * as Promise from "bluebird";
import {PersistenceInterface} from "../../interfaces/persistence.interface";
import {ModelInterface} from "../../interfaces/model.interface";

export abstract class BasePersistence implements PersistenceInterface {

    protected abstract _create(model: ModelInterface): Promise<boolean>
    protected abstract _fetchAll(idOrQuery: any | undefined): Promise<Array<any>>
    protected abstract _fetch(id: string): Promise<any>
    protected abstract _update(id: string | undefined, model: ModelInterface): Promise<boolean>
    protected abstract _remove(idOrQuery: any | undefined): Promise<boolean>

    protected _getHashString(inputString: string): string {
        return createHash('sha256').update(inputString).digest('hex');
    }

    public create(model: ModelInterface): Promise<boolean> {
        return this._create(model);
    }

    public fetchAll(idOrQuery: any | undefined): Promise<Array<any>> {
        return this._fetchAll(idOrQuery);
    }

    public fetch(id: string): Promise<any> {
        return this._fetch(id);
    }

    public update(id: string, model: ModelInterface): Promise<boolean> {
        return this._update(id, model);
    }

    public remove(idOrQuery: any | undefined): Promise<boolean> {
        return this._remove(idOrQuery);
    }
}
