import {UserService} from "../src/user/service/UserService";
import User from "../src/db/model/User";
import {Role} from "../src/user/dto/UserDto";

import {Database} from "../src/db/Database";

jest.mock('../src/db/Database');

const userService = new UserService();

describe('UserService', () => {
    describe('when saving', () => {
        const mockSave = jest.fn();
        mockSave.mockReturnValue({});
        Database.prototype.save = mockSave;

        const dto = {
            firstName: "Sercan",
            lastName: "ÖZDEMİR",
            email: "asd",
            password: "124",
            role: Role.ADMIN
        };
        const dtoAfterSave = {
            firstName: "Sercan",
            lastName: "ÖZDEMİR",
            email: "asd",
            password: "124",
            role: Role.ADMIN,
            id: 1
        };

        const entity = new User();
        entity.firstName = "Sercan";
        entity.lastName = "ÖZDEMİR";

        jest.spyOn(userService, 'convertDtoToEntity').mockImplementation(() => {
            return new Promise((res) => {
                res(entity);
            });
        });

        jest.spyOn(userService, 'convertEntityToDto').mockReturnValue(new Promise((res) => {
            res(dtoAfterSave);
        }));

        it('should call save & return dto', async () => {
            let savedOne = await userService.save(dto);
            expect(savedOne).toEqual(dtoAfterSave);
        })
    });
})