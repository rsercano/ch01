import {AbstractController} from "../../common/AbstractController";
import {QuestionDto} from "../dto/Types";
import Question from "../../db/model/Question";
import {QuestionService} from "../service/QuestionService";

class QuestionController extends AbstractController<QuestionDto, Question> {

    constructor() {
        super(Question, new QuestionService(), {relations: ['options']});
    }
}

export default new QuestionController();