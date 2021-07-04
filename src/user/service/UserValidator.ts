import express from "express";
import {Database} from "../../db/Database";
import User from "../../db/model/User";
import {Role} from "../dto/UserDto";
import {UserService} from "./UserService";

class UserValidator {

    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public checkLogin = async (shouldBeAdmin: boolean, req: express.Request, res: express.Response, next: express.NextFunction) => {
        const email = req.header("email");
        const password = req.header("password");

        if (email && password) {
            const user = await this.db.readByQuery({email}, User);
            // care for == instead of ===
            if (!user || (shouldBeAdmin && user.role != Role.ADMIN) || !UserService.checkPassword(password, user.password)) {
                res.status(401).send({error: `Unauthorized`});
            } else {
                next();
            }
        } else {
            res.status(400).send({error: `Missing email & password header parameters`});
        }
    }

    // specifically left double == for equality to check multi types.
    public validateSave = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!req.body || !req.body.email || !req.body.password || !req.body.lastName || !req.body.firstName) {
            res.status(400).send({error: `Missing required parameters one of email, password, lastName, firstName`});
        } else if (req.body.id) {
            res.status(401).send({error: 'Not allowed to update a user, please remove id'});
        } else {
            const userExist = await this.db.exists({email: req.body.email}, User);
            if (userExist) {
                res.status(400).send({error: `Email already exists`});
            } else if (req.body.role == Role.ADMIN && await this.db.exists({}, User)) {
                await this.checkLogin(true, req, res, next);
            } else {
                next();
            }
        }
    }
}

export default new UserValidator(new Database());