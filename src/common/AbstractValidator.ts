import express from "express";

export abstract class AbstractValidator {

    public validate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const email = req.header("email");
        const password = req.header("password");

        if (email && password) {

        }

        return false;
    }

}