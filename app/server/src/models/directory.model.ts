import {BaseModel} from "../classes/base/base-model";

export class DirectoryModel extends BaseModel {

    constructor(category: any) {
        super();

        this.id = category.id || null;
        this.name = category.name || null;
        this.date = category.date || null;
        this.contents = category.contents || null;
        this.parent = category.parent || null;
    }

    protected _properties = ['id'];

    public id: string;
    public name: string;
    public date: Date;
    public contents: string[];
    public parent: string;


    public toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            date: this.date,
            contents: this.contents,
            parent: this.parent
        };
    }
}
