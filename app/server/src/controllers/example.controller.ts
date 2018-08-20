import {BaseController} from "../classes/base/base-controller";
import {ExampleMongoRepository} from "../repositories/example.mongo.repository";
import * as express from "express";

export class ExampleController extends BaseController {
    protected _endpoint: string = '/example';
    protected _repository = new ExampleMongoRepository();
}