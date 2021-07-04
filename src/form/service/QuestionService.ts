import {AbstractService} from "../../common/AbstractService";
import Question from "../../db/model/Question";
import {OptionDto, QuestionDto} from "../dto/Types";

export class QuestionService extends AbstractService<QuestionDto, Question> {

    public convertDtoToEntity = async (dto: QuestionDto): Promise<Question> => {
        const entity = new Question();
        const literal = {
            id: dto.id,
            label: dto.label,
            required: dto.required || false,
            options: dto.options,
            form: {id: dto.formId}
        };
        Object.assign(entity, literal);
        return entity;
    }

    public convertEntityToDto = async (entity: Question): Promise<QuestionDto> => {
        if (!entity) return {} as QuestionDto;
        return {
            id: entity.id,
            label: entity.label,
            required: entity.required,
            options: QuestionService.convertOptions(entity.options, entity.id),
        } as QuestionDto;
    }

    public static convertOptions(options, questionId): OptionDto[] {
        const result = [] as OptionDto[];
        if (options && Array.isArray(options)) {
            for (const option of options) {
                result.push({
                    id: option.id,
                    label: option.label,
                    questionId
                });
            }
        }

        return result;
    }
}