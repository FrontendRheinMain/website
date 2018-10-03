import {ModelInterface} from "../interfaces/model.interface";
import {BaseRepository} from "../classes/base/base-repository";
import {PersistenceInterface} from "../interfaces/persistence.interface";
import {Schema} from "mongoose";
import {PersistenceMongodb} from "../persistences/persistence.mongodb";
import {DirectoryModel} from "../models/directory.model";

export class DirectoryMongoRepository extends BaseRepository {

    // Both persistence layers provide an identical interface
    protected _persistence: PersistenceInterface = new PersistenceMongodb(
        'Articles',
        new Schema({
            id: {type: String, index: true},
            name: {type: String, index: true},
            date: {type: Date, index: false, default: Date.now()},
            contents: [Schema.Types.ObjectId],
            parent: {type: Schema.Types.ObjectId, index: true}
        })
    );

    public addChild(categoryId: string, childId: string) {

    }

    public removeChild(categoryId: string, childId: string) {

    }

    public setParent(categoryId: string, parentCategoryId: string) {

    }




    protected _getModel(modelData): ModelInterface {
        return new DirectoryModel(modelData);
    }
}
