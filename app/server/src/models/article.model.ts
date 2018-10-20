import {BaseModel} from "../classes/base/base-model";

//import {ExampleDataInterface} from "../../../../../ts-node-foundation/shared/interfaces/example-data.interface";

export class ArticleModel extends BaseModel {

    constructor(article: any) {
        super();

        this._id = article._id || undefined;
        this.title = article.title || null;
        this.date = article.date || undefined;
        this.content = article.content || '';
        this.directory = article.directory || null;
        this.meta = article.meta || {}
    }

    protected _properties = ['_id'];

    public _id: string;
    public title: string;
    public date: Date;
    public content: string;
    public directory: string;
    public meta: any;


    public toJSON(): any {
        return {
            _id: this._id,
            title: this.title,
            date: this.date,
            content: this.content,
            directory: this.directory,
            meta: this.meta,
        };
    }
}
