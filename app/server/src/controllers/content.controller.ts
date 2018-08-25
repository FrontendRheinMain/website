import {BaseController} from "../classes/base/base-controller";
import {ExampleMongoRepository} from "../repositories/example.mongo.repository";
import * as express from "express";
import {GithubContentApiRepository} from "../repositories/github-content-api.repository";

export class ContentController extends BaseController {
    protected _endpoint: string = '/content';
    protected _repository = new GithubContentApiRepository();
}