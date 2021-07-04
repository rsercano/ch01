import {AbstractController} from "../../common/AbstractController";
import {UserDto} from "../dto/UserDto";
import User from "../../db/model/User";
import {UserService} from "../service/UserService";

class UserController extends AbstractController<UserDto, User> {

    constructor() {
        super(User, new UserService());
    }
}

export default new UserController();