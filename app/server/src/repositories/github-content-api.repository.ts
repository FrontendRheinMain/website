import {ModelInterface} from "../interfaces/model.interface";
import {BaseRepository} from "../classes/base/base-repository";
import {PersistenceInterface} from "../interfaces/persistence.interface";

import {PersistencePrintln} from "../persistences/persistence.println";
import {GithubContentApiModel} from "../models/github-content-api.model";

export class GithubContentApiRepository extends BaseRepository {
    protected _persistence: PersistenceInterface = new PersistencePrintln('githubapi');

    protected _getModel(modelData): ModelInterface {
        let model = new GithubContentApiModel(modelData);
        return model;
    }
}