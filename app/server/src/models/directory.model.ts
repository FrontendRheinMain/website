import {BaseModel} from "../classes/base/base-model";

export class DirectoryModel extends BaseModel {

    constructor(category: any) {
        super();

        this._id = category._id || undefined;
        this.name = category.name || null;
        this.date = category.date || undefined;
        this.contents = category.contents || [];
        this.parent = category.parent || null;
    }

    protected _properties = ['id'];

    public _id: string;
    public name: string;
    public date: Date;
    public contents: string[];
    public parent: string;


    public toJSON(): any {
        return {
            _id: this._id,
            name: this.name,
            date: this.date,
            contents: this.contents,
            parent: this.parent
        };
    }
}
