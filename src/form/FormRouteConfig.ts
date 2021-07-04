import {AbstractRouteConfig} from "../common/AbstractRouteConfig";
import express from 'express';
import FormController from "./controller/FormController";
import FormValidator from "./service/FormValidator";
import UserValidator from "../user/service/UserValidator";

export class FormRouteConfig extends AbstractRouteConfig {

    constructor(app: express.Application) {
        super(app);
    }

    configure() {
        this.app.post('/form/', [
            (req, res, next) => {
                return UserValidator.checkLogin(true, req, res, next);
            },
            FormValidator.validate,
            FormController.save
        ]);
        this.app.route('/form/:formId')
            .get(FormController.read)
            .delete(FormController.delete)

        this.app.put('/form/:id/question') // create new question
        this.app.route('/question/:id')
            .get() // get the question
            .post() // update the question
            .delete() // delete the question

        this.app.put('/question/:id/options') // create new options
        this.app.route('/options/:id')
            .get() // get the option
            .post() // update the option
            .delete() // delete the option

        this.app.route('/form/:formId/:userId')
            .put() // submit the form
            .get() // get the submitted form data
    }

}