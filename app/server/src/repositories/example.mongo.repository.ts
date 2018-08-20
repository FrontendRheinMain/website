import {ModelInterface} from "../interfaces/model.interface";
import {BaseRepository} from "../classes/base/base-repository";
import {ExampleModel} from "../models/example.model";
import {PersistenceInterface} from "../interfaces/persistence.interface";
import {Schema} from "mongoose";
import {PersistenceMongodb} from "../persistences/persistence.mongodb";

export class ExampleMongoRepository extends BaseRepository {

    // Both persistence layers provide an identical interface
    protected _persistence: PersistenceInterface = new PersistenceMongodb('testdb', 'testcolection', new Schema({
        id: {type: String, index: true},
        name: {type: String, index: true},
        description: {type: String, index: false}
    }));

    protected _getModel(modelData): ModelInterface {
        let model = new ExampleModel(modelData);
        return model;
    }
}