import {ModelInterface} from "../interfaces/model.interface";
import {BaseRepository} from "../classes/base/base-repository";
import {PersistenceInterface} from "../interfaces/persistence.interface";
import {Schema} from "mongoose";
import {PersistenceMongodb} from "../persistences/persistence.mongodb";
import {ArticleModel} from "../models/article.model";

export class ArticleMongoRepository extends BaseRepository {

    // Both persistence layers provide an identical interface
    protected _persistence: PersistenceInterface = new PersistenceMongodb(
        'Articles',
        new Schema({
            id: {type: String, index: true},
            title: {type: String, index: true},
            date: {type: String, index: false},
            content: {type: String, index: false},
            category: {type: 'ObjectId', index: true}
        })
    );

    protected _getModel(modelData): ModelInterface {
        return new ArticleModel(modelData);
    }
}
