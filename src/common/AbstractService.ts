import {Database} from "../db/Database";
import {ObjectType} from "typeorm/common/ObjectType";

export abstract class AbstractService<Dto, Entity> {

    protected db: Database;

    constructor() {
        this.db = new Database();
    }

    public save = async (dto: Dto): Promise<Dto> => {
        const entity = await this.convertDtoToEntity(dto);
        const savedEntity = await this.db.save(entity);

        return this.convertEntityToDto(savedEntity);
    }

    public read = async (id: string, target: ObjectType<Entity>): Promise<Dto> => {
        const entity = await this.db.read(id, target);

        return this.convertEntityToDto(entity);
    }

    public delete = async (id: string, target: ObjectType<Entity>): Promise<boolean> => {
        function tryParseInt(id: string) {
            let number = parseInt(id);
            if (!isNaN(number)) {
                return number;
            }
            throw new Error("You need to provide a number as ID");
        }

        const deleteResult = await this.db.delete(tryParseInt(id), target);
        return deleteResult.affected > 0;
    }

    abstract convertDtoToEntity(dto: Dto): Promise<Entity>;

    abstract convertEntityToDto(entity: Entity): Promise<Dto>;

}
