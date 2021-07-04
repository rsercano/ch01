import {AbstractRouteConfig} from "../common/AbstractRouteConfig";
import express from 'express';
import UserController from "./controller/UserController";
import UserValidator from "./service/UserValidator";

export class UserRouteConfig extends AbstractRouteConfig {

    constructor(app: express.Application) {
        super(app);
    }

    configure() {
        this.app.route('/user/')
            .put(
                UserValidator.validateSave,
                UserController.save
            )
    }

}