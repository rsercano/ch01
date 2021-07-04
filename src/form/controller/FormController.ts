import {AbstractController} from "../../common/AbstractController";
import {FormDto} from "../dto/Types";
import Form from "../../db/model/Form";
import {FormService} from "../service/FormService";

class FormController extends AbstractController<FormDto, Form> {

    constructor() {
        super(Form, new FormService());
    }
}

export default new FormController();