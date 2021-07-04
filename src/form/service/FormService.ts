import {AbstractService} from "../../common/AbstractService";
import Form from "../../db/model/Form";
import {FormDto} from "../dto/Types";

export class FormService extends AbstractService<FormDto, Form> {

    public convertDtoToEntity = async (dto: FormDto): Promise<Form> => {
        return {
            id: dto.id,
            label: dto.label,
            questions: dto.questions
        } as Form;
    }

    public convertEntityToDto = async (entity: Form): Promise<FormDto> => {
        return {
            id: entity.id,
            label: entity.label,
            questions: entity.questions
        } as FormDto;
    }

}