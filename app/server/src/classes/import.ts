import * as request from "request-promise-native";
import * as showdown from "showdown";
import {ArticleMongoRepository} from "../repositories/article.mongo.repository";
import {DirectoryMongoRepository} from "../repositories/directory.mongo.repository";

export class Import {

    private _directoryRepository = new DirectoryMongoRepository();
    private _articleRepository = new ArticleMongoRepository();
    private apiHeaders = {
        'User-Agent': 'curl/7.54.0'
    };
    private converter;

    constructor(private logging: boolean = false) {

        if (!!process.env.GITHUB_API_TOKEN && process.env.GITHUB_API_TOKEN.length > 0) {
            this.apiHeaders['Authorization'] = 'token ' + process.env.GITHUB_API_TOKEN;
        }

        // @ts-ignore
        this.converter = new showdown.Converter({metadata: true});
    }

    public run() {
        return Promise.all([
            this._articleRepository.destroy(),
            this._directoryRepository.destroy()
        ]).then(() => {
            return this
                .fetchRootDirectory()
                .then((rootRefAndContentsAndDirs: any) => {
                    const ROOT_REF = 0;
                    const ROOT_REF_CONTENT = 1;

                    return this.processDirectory(
                        rootRefAndContentsAndDirs[ROOT_REF_CONTENT],
                        rootRefAndContentsAndDirs[ROOT_REF]
                    );
                });
        })
    }

    private fetchRootDirectory(path: string = ''): Promise<any> {
        let url = process.env.GITHUB_CONTENT_API;

        url += path;

        this.log(`Fetch Root @ ${url}`);

        return Promise.all([
                this.createRootDirectory('root')
                    .then((rootDirectoryDocument) => {
                        return (!!rootDirectoryDocument._id) ? rootDirectoryDocument._id : null;
                    }),
                request({
                    url: url,
                    headers: this.apiHeaders,
                    json: true
                })
            ]
        );
    }

    private createRootDirectory(rootDirectoryName: string): any {
        return this
            ._directoryRepository
            .create({
                name: rootDirectoryName
            });
    }

    private processDirectory(contentsAndDirs, parent: string) {

        return Promise
            .all([
                    this.fetchArticles(contentsAndDirs, parent),
                    this.fetchDirectories(contentsAndDirs, parent)
                ]
            );
    }

    private fetchDirectories(contentsAndDirs: any[], parent: string) {

        return Promise
            .all(
                contentsAndDirs
                    .filter((contentOrDir) => {
                        return contentOrDir.type === 'dir';
                    })
                    .map((directoryToFetch) => {
                            return this.fetchDirectory(directoryToFetch, parent);
                        }
                    )
            );
    }

    private fetchDirectory(directoryToFetch: any, parent: string) {
        this.log(`Fetch ${directoryToFetch.url} which is a child of ${parent}`);
        this.log('This folder (name and parent should pe persisted via dir class)');
        return request({
            url: directoryToFetch.url,
            headers: this.apiHeaders,
            json: true
        })
            .then((contentsAndDirs) => {

                let directoryName = directoryToFetch.url
                    .split('/')
                    .pop()
                    .replace(/\?\S+/, '');


                this.log('Create Directory');
                this.log({
                    name: directoryName,
                    parent: parent
                });

                return Promise
                    .all([
                        Promise.resolve(contentsAndDirs),
                        this._directoryRepository.create({
                            name: directoryName,
                            parent: parent
                        })
                    ]);
            })
            .then((newDirectoryWithContents) => {
                const NEW_DIRECTORY = 1;
                const NEW_DIRECTORY_CONTENT = 0;
                return this.processDirectory(
                    newDirectoryWithContents[NEW_DIRECTORY_CONTENT],
                    newDirectoryWithContents[NEW_DIRECTORY]['_id']
                );
            });

    }

    private fetchArticles(contentsAndDirs: any[], parent: string) {


        return Promise
            .all(contentsAndDirs

                .filter((contentOrDir) => {
                    return contentOrDir.type === 'file';
                })

                .map((articleToFetch) => {
                    return this.fetchArticle(articleToFetch, parent);
                }));
    }

    private fetchArticle(articleToFetch: any, parent: string) {
        this.log(`Fetch Article @ ${ articleToFetch.download_url}`);
        this.log('This article should be persisted via article class');

        return request({
            url: articleToFetch.download_url,
            headers: {
                'User-Agent': 'curl/7.54.0'
            }
        })
            .then((fetchedArticle) => {
                let html = this.converter.makeHtml(fetchedArticle);
                let meta = this.converter.getMetadata();

                let title = meta.title || articleToFetch.download_url
                    .split('/')
                    .pop()
                    .replace(/-/g, ' ')
                    .replace('.md', '');


                let date = (!!meta.date) ? new Date(meta.date) : Date.now();
                delete meta.date;

                return this._articleRepository
                    .create({
                        title: title,
                        date: date,
                        content: html,
                        directory: parent,
                        meta: meta
                    });
            });
    }

    private log(msg: any) {
        if (this.logging) {
            console.log(msg);
        }
    }
}
