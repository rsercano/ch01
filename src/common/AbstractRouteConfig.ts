import express from 'express';

export abstract class AbstractRouteConfig {
    app: express.Application;

    protected constructor(app: express.Application) {
        this.app = app;
    }

    abstract configure(): void;
}