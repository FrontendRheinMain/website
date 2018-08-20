import {BasePersistence} from "../classes/base/base-persistence";
import {ModelInterface} from "../interfaces/model.interface";
import * as Promise from 'bluebird';
import * as mongoose from "mongoose";
import {Schema, model} from "mongoose";


export class PersistenceMongodb extends BasePersistence {

    private MongoDbModel;
    private connection;

    constructor(private dbName: string, private collectionName: string, private schema: Schema) {
        super();
    }

    private _connect() {

        if (
            !process.env.MONGO_HOST ||
            !process.env.MONGO_PORT ||
            !process.env.MONGO_DBNAME ||
            [process.env.MONGO_HOST, process.env.MONGO_PORT, process.env.MONGO_DBNAME].indexOf('undefined') !== -1
        ) {
            throw new Error('MongoDB credentials missing. Pleas specify in all config files at db property({"mongo":{"host":"MY_HOST", "port":"MY_PORT", "dbname":"MY_DB"}})');
        }

        return new Promise((resolve) => {
            if (!!this.MongoDbModel) {
                resolve(true);
            } else {
                mongoose
                    .connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DBNAME, {
                        useNewUrlParser: true
                    })
                    .then((connection) => {
                        this.connection = connection;
                        this.MongoDbModel = model(this.collectionName, this.schema);
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
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    protected _fetchAll(): Promise<Array<any>> {
        return this._connect()
            .then(() => {
                return this.MongoDbModel.find({});
            });
    }

    protected _fetch(id: string): Promise<any> {
        return this._connect()
            .then(() => {
                return this.MongoDbModel.findOne({id: id});
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

    protected _remove(id: string): Promise<boolean> {
        return this
            ._connect()
            .then(() => {
                return this.MongoDbModel.findOneAndRemove({id: id});
            })
            .then((result) => {
                return result !== null;
            }).catch((error) => {
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