import {AbstractService} from "../../common/AbstractService";
import Form from "../../db/model/Form";
import {FormDto, QuestionDto} from "../dto/Types";
import {QuestionService} from "./QuestionService";
import Submission from "../../db/model/Submission";
import User from "../../db/model/User";

export class FormService extends AbstractService<FormDto, Form> {

    public submit = async (submissions, formId, userEmail) => {
        const user = await this.db.readByQuery({email: userEmail}, User);
        const form = await this.db.read(formId, Form, {relations: ['questions', 'questions.options']});

        const submissionsEntities = await this.convertSubmissions(submissions, user, form);
        for (const submissionsEntity of submissionsEntities) {
            await this.db.save(submissionsEntity);
        }
    }

    public convertDtoToEntity = async (dto: FormDto): Promise<Form> => {
        const entity = new Form();
        const literal = {
            id: dto.id,
            label: dto.label,
            questions: dto.questions
        };
        Object.assign(entity, literal);
        return entity;
    }

    public convertEntityToDto = async (entity: Form): Promise<FormDto> => {
        if (!entity) return {} as FormDto;
        return {
            id: entity.id,
            label: entity.label,
            questions: FormService.convertQuestions(entity.questions, entity.id)
        } as FormDto;
    }

    private convertSubmissions = async (submissions, user: User, form: Form): Promise<Submission[]> => {
        const result: Submission[] = [];

        for (const submission of submissions) {
            const entity = new Submission();
            let question = form.questions.find(x => x.id === submission.questionId);
            entity.user = user;
            entity.question = question;
            entity.options = question.options.filter(x => submission.optionIds.includes(x.id));
            result.push(entity);
        }

        return result;
    }

    private static convertQuestions(questions, formId: number): QuestionDto[] {
        const result = [] as QuestionDto[];
        if (questions && Array.isArray(questions)) {
            for (const question of questions) {
                result.push({
                    id: question.id,
                    label: question.label,
                    required: question.required,
                    options: QuestionService.convertOptions(question.options, question.id),
                    formId
                });
            }
        }

        return result;
    }
}