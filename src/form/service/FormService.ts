import {AbstractService} from "../../common/AbstractService";
import Form from "../../db/model/Form";
import {FormDto, QuestionDto} from "../dto/Types";
import {QuestionService} from "./QuestionService";

export class FormService extends AbstractService<FormDto, Form> {

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