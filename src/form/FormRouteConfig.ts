import {AbstractRouteConfig} from "../common/AbstractRouteConfig";
import express from 'express';

export class FormRouteConfig extends AbstractRouteConfig {

    constructor(app: express.Application) {
        super(app);
    }

    configure() {
        this.app.put('/form/') // create new form
        this.app.route('/form/:formId')
            .get() // get the form with all questions/options
            .post() // update
            .delete() // delete the form with all questions/options

        this.app.put('/form/:formId/question') // create new question
        this.app.route('/form/:formId/question/:questionId')
            .get() // get the question
            .post() // update the question
            .delete() // delete the question

        this.app.put('/form/:formId/question/:questionId/options') // create new options
        this.app.route('/form/:formId/question/:questionId/options/:optionId')
            .get() // get the option
            .post() // update the option
            .delete() // delete the option

        this.app.route('/form/:formId/:userId')
            .put() // submit the form
            .get() // get the submitted form data
    }

}