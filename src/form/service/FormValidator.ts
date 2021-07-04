import express from "express";
import {Database} from "../../db/Database";
import Form from "../../db/model/Form";
import Question from "../../db/model/Question";

class FormValidator {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public validateRequiredFields = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body && req.body.label) {
            next();
        } else {
            res.status(400).send({error: `Missing required field label`});
        }
    }

    public validateQuestionSave = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body && req.body.formId) {
            if (!await this.db.exists({id: req.body.formId}, Form)) {
                res.status(400).send({error: `Form is not found for id ${req.body.formId}`});
            } else {
                next();
            }
        } else {
            res.status(400).send({error: `Missing required field formId`});
        }
    }

    public validateOptionSave = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body && req.body.questionId) {
            if (!await this.db.exists({id: req.body.questionId}, Question)) {
                res.status(400).send({error: `Question is not found for id ${req.body.questionId}`});
            } else {
                next();
            }
        } else {
            res.status(400).send({error: `Missing required field questionId`});
        }
    }
}

export default new FormValidator(new Database());