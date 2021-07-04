import {AbstractRouteConfig} from "../common/AbstractRouteConfig";
import express from 'express';
import FormController from "./controller/FormController";
import FormValidator from "./service/FormValidator";
import UserValidator from "../user/service/UserValidator";
import QuestionController from "./controller/QuestionController";

export class FormRouteConfig extends AbstractRouteConfig {

    constructor(app: express.Application) {
        super(app);
    }

    configure() {
        this.app.post('/form/', [
            (req, res, next) => {
                return UserValidator.checkLogin(true, req, res, next);
            },
            FormValidator.validateRequiredFields,
            FormController.save
        ]);
        this.app.route('/form/:id')
            .get((req, res, next) => {
                    return UserValidator.checkLogin(false, req, res, next);
                },
                FormController.read
            )
            .delete((req, res, next) => {
                    return UserValidator.checkLogin(true, req, res, next);
                },
                FormController.delete
            )

        this.app.post('/question', [
            (req, res, next) => {
                return UserValidator.checkLogin(true, req, res, next);
            },
            FormValidator.validateRequiredFields,
            FormValidator.validateQuestionSave,
            QuestionController.save
        ])
        this.app.route('/question/:id')
            .get((req, res, next) => {
                    return UserValidator.checkLogin(false, req, res, next);
                },
                QuestionController.read
            )
            .delete((req, res, next) => {
                    return UserValidator.checkLogin(true, req, res, next);
                },
                QuestionController.delete
            )

        this.app.post('/option')
        this.app.route('/option/:id')
            .get() // get the option
            .post() // update the option
            .delete() // delete the option

        this.app.route('/form/:formId/:id')
            .put() // submit the form
            .get() // get the submitted form data
    }

}