import express from "express";
import {Database} from "../../db/Database";
import Form from "../../db/model/Form";
import Question from "../../db/model/Question";
import User from "../../db/model/User";
import {In} from "typeorm";
import Submission from "../../db/model/Submission";

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

    public validateSubmit = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body && Array.isArray(req.body) && req.params.id) {

            const form = await this.db.read(req.params.id, Form, {relations: ['questions', 'questions.options']});
            const user = await this.db.readByQuery({email: req.header('email')}, User);

            if (!form) {
                res.status(400).send({error: `Form with ID ${req.params.id} not found`});
                return;
            }

            const previousSubmission = await this.db.readByQuery({
                user: {id: user.id},
                question: {id: In(form.questions.map(x => x.id))}
            }, Submission)

            if (previousSubmission) {
                res.status(400).send({error: 'Already submitted'});
            } else {
                for (const question of form.questions) {
                    const submissionsToThisQuestion = req.body.filter(x => x.questionId === question.id);
                    if (submissionsToThisQuestion.length > 1) {
                        res.status(400).send({error: 'Question should be answered once'});
                        return;
                    } else if (question.required && submissionsToThisQuestion.length !== 1) {
                        res.status(400).send({error: 'Required question is missing'});
                        return;
                    } else if (submissionsToThisQuestion.length === 1 && !submissionsToThisQuestion[0].optionIds.every(y => question.options.map(x => x.id).includes(y))) {
                        res.status(400).send({error: `Wrong option/question relation for question: ${question.id}`});
                        return;
                    }
                }

                next();
            }
        } else {
            res.status(400).send({error: `Missing required array of submissions/formId`});
        }
    }
}

export default new FormValidator(new Database());