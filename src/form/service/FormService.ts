import {AbstractService} from "../../common/AbstractService";
import Form from "../../db/model/Form";
import {FormDto} from "../dto/Types";

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
            questions: entity.questions
        } as FormDto;
    }

}