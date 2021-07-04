import express from "express";

class FormValidator {
    async validate(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.label) {
            next();
        } else {
            res.status(400).send({error: `Missing required field label`});
        }
    }
}

export default new FormValidator();