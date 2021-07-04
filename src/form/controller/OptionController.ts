import {AbstractController} from "../../common/AbstractController";
import {OptionDto} from "../dto/Types";
import Option from "../../db/model/Option";
import {OptionService} from "../service/OptionService";

class OptionController extends AbstractController<OptionDto, Option> {

    constructor() {
        super(Option, new OptionService());
    }
}

export default new OptionController();