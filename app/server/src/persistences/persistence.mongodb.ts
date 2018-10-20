import {BasePersistence} from "../classes/base/base-persistence";
import {ModelInterface} from "../interfaces/model.interface";
import * as Promise from 'bluebird';
import * as mongoose from "mongoose";
import {Schema, model} from "mongoose";


export class PersistenceMongodb extends BasePersistence {

    private MongoDbModel;
    private connection;

    constructor(private collectionName: string, private schema: Schema) {
        super();
    }

    private _connect() {

        if (
            !process.env.MONGO_HOST ||
            !process.env.MONGO_PORT ||
            !process.env.MONGO_DBNAME ||
            [process.env.MONGO_HOST, process.env.MONGO_PORT, process.env.MONGO_DBNAME].indexOf('undefined') !== -1
        ) {
            throw new Error('MongoDB credentials missing. Please specify in all config files at db property({"mongo":{"host":"MY_HOST", "port":"MY_PORT", "dbname":"MY_DB"}})');
        }

        return new Promise((resolve) => {
            if (!!this.MongoDbModel) {
                resolve(true);
            } else {
                mongoose
                    .connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DBNAME, {
                        useNewUrlParser: true,
                        useCreateIndex: true
                    })
                    .then((connection) => {
                        let existingModels = mongoose.models;
                        this.connection = connection;
                        this.MongoDbModel = (!existingModels[this.collectionName]) ? model(this.collectionName, this.schema) : existingModels[this.collectionName];

                        resolve(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        });
    }

    protected _create(item: ModelInterface): Promise<boolean> {
        return this._connect()
            .then(() => {
                let modelData = item.toJSON();
                return new this.MongoDbModel(modelData).save();
            })
            .then((newDocument) => {
                return newDocument;
            })
            .catch(() => {
                return false;
            });
    }

    protected _fetchAll(idOrQuery: any | undefined): Promise<Array<any>> {
        return this._connect()
            .then(() => {
                return this.MongoDbModel.find((!idOrQuery) ? {} : (typeof idOrQuery === 'string') ? {id: idOrQuery} : idOrQuery);
            });
    }


    protected _fetch(_id: string): Promise<any> {
        return this
            ._connect()
            .then(() => {
                return this.MongoDbModel.findOne({_id: _id});
            });
    }

    protected _update(id: string, model: ModelInterface): Promise<boolean> {
        return this
            ._connect()
            .then(() => {
                return this.MongoDbModel.findOneAndUpdate({id: id}, {$set: model.toJSON()})
            })
            .then((result) => {
                return result !== null;
            }).catch((error) => {
                return false;
            });
    }

    protected _remove(idOrQuery: any | undefined): Promise<boolean> {

        return this
            ._connect()
            .then(() => {
                return this.MongoDbModel.remove((!idOrQuery) ? {} : (typeof idOrQuery === 'string') ? {id: idOrQuery} : idOrQuery);
            })
            .then((result) => {
                return result !== null;
            })
            .catch((error) => {
                return false;
            });
    }

    public disconnect(): Promise<any> {
        return this
            .connection
            .disconnect()
            .then(() => {
                return true;
            }).catch(() => {
                return false;
            });
    }
}
