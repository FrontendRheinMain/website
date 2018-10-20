import {ModelInterface} from "../interfaces/model.interface";
import {BaseRepository} from "../classes/base/base-repository";
import {PersistenceInterface} from "../interfaces/persistence.interface";
import {Schema} from "mongoose";
import {PersistenceMongodb} from "../persistences/persistence.mongodb";
import {DirectoryModel} from "../models/directory.model";

export class DirectoryMongoRepository extends BaseRepository {

    // Both persistence layers provide an identical interface
    protected _persistence: PersistenceInterface = new PersistenceMongodb(
        'Directories',
        new Schema({
            id: {type: String, index: true},
            parent: {type: Schema.Types.ObjectId, index: true, required: false},
            name: {type: String, index: true},
            date: {type: Date, index: false, default: Date.now()},
            contents: [Schema.Types.ObjectId]
        })
    );

    public fetchRoot() {
        return this
            ._persistence
            .fetchAll({parent: null})
            .then((rootDirectoryResult) => {
                return this._persistence.fetchAll({parent: rootDirectoryResult.pop()._id})
            })
            .then((rootDirectoryChilds) => {
                return rootDirectoryChilds
                    .map((rootDirectoryChild) => {
                        return {
                            name: rootDirectoryChild.name,
                            date: rootDirectoryChild.date,
                            id: rootDirectoryChild.id
                        };
                    });
            });
    }

    public destroy() {
        this._persistence.remove({});
    }

    protected _getModel(modelData): ModelInterface {
        return new DirectoryModel(modelData);
    }
}
