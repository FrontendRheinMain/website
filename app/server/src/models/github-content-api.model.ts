import {BaseModel} from "../classes/base/base-model";
import {GithubContentApiLinksInterface} from "../interfaces/github-content-api-links.interface";
import {GithubContentApiInterface} from "../interfaces/github-content-api.interface";

//import {ExampleDataInterface} from "../../../../../ts-node-foundation/shared/interfaces/example-data.interface";

export class GithubContentApiModel extends BaseModel {

    constructor(model: GithubContentApiInterface) {
        super();

        if (!!model) {
            Object.keys(model).forEach((property) => this[property] = model[property]);
        }
    }

    protected _properties = [];

    public name: string;
    public path: string;
    public sha: string;
    public size: number;
    public url: string;
    public html_url: string;
    public git_url: string;
    public download_url: string;
    public type: string;
    public content: string;
    public encoding: string;
    public _links: GithubContentApiLinksInterface;


    public toJSON(): any {
        return {
            name: this.name,
            path: this.path,
            sha: this.sha,
            size: this.size,
            url: this.url,
            html_url: this.html_url,
            git_url: this.git_url,
            download_url: this.download_url,
            type: this.type,
            content: this.content,
            encoding: this.encoding,
            _links: this._links,
        };
    }
}