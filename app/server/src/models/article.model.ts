import {BaseModel} from "../classes/base/base-model";

//import {ExampleDataInterface} from "../../../../../ts-node-foundation/shared/interfaces/example-data.interface";

export class ArticleModel extends BaseModel {

    constructor(article: any) {
        super();

        this.id = article.id || null;
        this.title = article.title || null;
        this.date = article.date || null;
        this.content = article.content || null;
        this.category = article.category || null;

    }

    protected _properties = ['id'];

    public id: string;
    public title: string;
    public date: Date;
    public content: string;
    public category: string;


    public toJSON(): any {
        return {
            id: this.id,
            title: this.title,
            date: this.date,
            content: this.content,
            category: this.category
        };
    }
}
