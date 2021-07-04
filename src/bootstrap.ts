import express from "express";
import * as expressWinston from "express-winston";
import * as winston from "winston";
import {UserRouteConfig} from "./user/UserRouteConfig";
import * as bodyparser from "body-parser";
import {FormRouteConfig} from "./form/FormRouteConfig";
import {Database} from "./db/Database";

export class Bootstrap {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }

    initialize() {
        this.app.use(bodyparser.json());

        this.app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            )
        }));
        this.app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            )
        }));

        new Database().init();
    }

    configureRoots() {
        new FormRouteConfig(this.app).configure();
        new UserRouteConfig(this.app).configure();

        this.app.get('/status', (req: express.Request, res: express.Response) => {
            res.status(200).send(`OK`)
        });
    }
}