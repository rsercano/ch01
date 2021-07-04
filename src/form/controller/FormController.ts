import {AbstractController} from "../../common/AbstractController";
import {FormDto} from "../dto/Types";
import Form from "../../db/model/Form";
import {FormService} from "../service/FormService";
import {Request, Response} from "express";

class FormController extends AbstractController<FormDto, Form> {

    constructor() {
        super(Form, new FormService(), {relations: ['questions', 'questions.options']});
    }

    public submit = async (req: Request, res: Response) => {
        (this.service as FormService).submit(req.body, req.params.id, req.header('email'))
            .then(() => {
                res.status(201).send({message: 'Successfully submitted'});
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    }
}

export default new FormController();