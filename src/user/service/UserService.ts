import {AbstractService} from "../../common/AbstractService";
import {Role, UserDto} from "../dto/UserDto";
import User from "../../db/model/User";
import bcrypt from 'bcryptjs';

export class UserService extends AbstractService<UserDto, User> {

    public convertDtoToEntity = async (dto: UserDto): Promise<User> => {
        const entity = new User();
        const literal = {
            id: dto.id,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: UserService.hashPassword(dto.password),
            role: await this.isFirstUser() ? Role.ADMIN : (dto.role || Role.USER)
        };
        Object.assign(entity, literal);
        return entity;
    }

    public convertEntityToDto = async (entity: User): Promise<UserDto> => {
        return {
            id: entity.id,
            firstName: entity.firstName,
            lastName: entity.lastName,
            email: entity.email,
            role: entity.role,
            password: null
        } as UserDto;
    }

    public static hashPassword(password: string): string {
        if (password) {
            return bcrypt.hashSync(password);
        }
        return password;
    }

    public static checkPassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    private async isFirstUser() {
        return !await this.db.exists({}, User);
    }
}