import {BaseController} from "../classes/base/base-controller";
import * as express from "express";
import {GithubContentApiRepository} from "../repositories/github-content-api.repository";
import * as requestPromiseNative from "request-promise-native";
import * as showdown from "showdown";

export class ContentController extends BaseController {
    protected _endpoint: string = '/content';
    protected _repository = new GithubContentApiRepository();

    private converter;

    constructor(_router: express.Router) {
        super(_router);

        // @ts-ignore
        this.converter = new showdown.Converter({metadata: true});

        this._router.get(this._endpoint + '/json', (req: express.Request, res: express.Response): void => {

            console.log('reach here');

            console.log(process.env.GITHUB_CONTENT_API);

            requestPromiseNative
                .get({
                    url: process.env.GITHUB_CONTENT_API,
                    headers: {
                        'User-Agent': 'curl/7.54.0'
                    },
                    json: true
                })
                .then((response) => {
                    res.send(response
                        .filter((item) => {
                            return item.type === 'dir';
                        })
                        .map((item) => {
                            let replacement = (process.env.NODE_ENV === 'production') ? 'content/json/' : 'api/content/json/';

                            return {
                                name: item.name,
                                path: item.path.replace('content/', replacement)
                            }
                        }));
                })
                .catch((error) => {
                    console.log(error.message);
                    res.status(404).send({error: 'NOT_FOUND'});
                });
        });

        // Fetch explicit file
        this._router.get(this._endpoint + '/json/:type/:file', (req: express.Request, res: express.Response): void => {

            let url = process.env.GITHUB_RAW_API + '/' + req.params.type + '/' + req.params.file;


            console.log('Fetch');
            console.log(url);

            requestPromiseNative
                .get({
                    url: url,
                    headers: {
                        'User-Agent': 'curl/7.54.0'
                    }
                })
                .then((response) => {
                    let html = this.converter.makeHtml(response);
                    let metaData = this.converter.getMetadata();

                    res.send({
                        metaData: metaData,
                        content: html
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    res.status(404).send({error: 'NOT_FOUND'});
                });
        });

        // List content of a folder
        this._router.get(this._endpoint + '/json/:type', (req: express.Request, res: express.Response): void => {
            let url = process.env.GITHUB_CONTENT_API.replace('?', '/' + req.params.type + '?');

            requestPromiseNative
                .get({
                    url: url,
                    headers: {
                        'User-Agent': 'curl/7.54.0'
                    },
                    json: true
                })
                .then((response) => {
                    res.send(response
                        .map((item) => {
                            let replacement = (process.env.NODE_ENV === 'production') ? 'content/json/' : 'api/content/json/';
                            return {
                                name: item.name,
                                path: item.path.replace('content/', replacement)
                            };
                        }));
                })
                .catch((error) => {
                    //console.log(error);
                    res.status(404).send({error: 'NOT_FOUND'});
                });
        });

    }
}
