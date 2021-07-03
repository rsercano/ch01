import {AbstractRouteConfig} from "../config/AbstractRouteConfig";
import express from 'express';

export class UserRouteConfig extends AbstractRouteConfig {

    constructor(app: express.Application) {
        super(app);
    }

    configure() {
        this.app.route('/users/')
            .put() // create new user
            .post() // login
    }

}