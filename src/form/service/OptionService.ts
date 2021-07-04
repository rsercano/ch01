import {AbstractService} from "../../common/AbstractService";
import Option from "../../db/model/Option";
import {OptionDto} from "../dto/Types";

export class OptionService extends AbstractService<OptionDto, Option> {

    public convertDtoToEntity = async (dto: OptionDto): Promise<Option> => {
        const entity = new Option();
        const literal = {
            id: dto.id,
            label: dto.label,
            question: {id: dto.questionId}
        };
        Object.assign(entity, literal);
        return entity;
    }

    public convertEntityToDto = async (entity: Option): Promise<OptionDto> => {
        if (!entity) return {} as OptionDto;
        return {
            id: entity.id,
            label: entity.label,
        } as OptionDto;
    }
}