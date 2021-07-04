import {createConnection, DeleteResult, ObjectType} from "typeorm";
import Form from "./model/Form";
import Option from "./model/Option";
import Question from "./model/Question";
import User from "./model/User";
import Submission from "./model/Submission";
import {Connection} from "typeorm/connection/Connection";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

export class Database {

    private static connection: Promise<Connection>;

    public init() {
        Database.connection = createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "postgres",
            schema: "qooper",
            entities: [
                Form,
                Option,
                Question,
                User,
                Submission
            ],
            synchronize: true,
            logging: true
        });
    }

    public async save<T>(entity: T): Promise<T> {
        const conn = await Database.connection;
        return conn.manager.save(entity);
    }

    public async read<T>(id: string, target: ObjectType<T>, options?: FindOneOptions<T>): Promise<T> {
        const conn = await Database.connection;
        return conn.manager.findOne(target, id, options);
    }

    public async readByQuery<T>(query: any, target: ObjectType<T>): Promise<T> {
        const conn = await Database.connection;
        return conn.manager.findOne(target, query);
    }

    public async exists<T>(query: any, target: ObjectType<T>): Promise<boolean> {
        const conn = await Database.connection;
        return await conn.manager.count(target, query) > 0;
    }

    public async delete<T>(id: number, target: ObjectType<T>): Promise<DeleteResult> {
        const conn = await Database.connection;
        return conn.manager.delete(target, {id});
    }
}