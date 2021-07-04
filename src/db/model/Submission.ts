import {Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";
import Question from "./Question";
import Option from "./Option";

@Entity()
export class Submission {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User,
        user => user.submissions)
    user: User;

    @ManyToOne(() => Question, {onDelete: "CASCADE"})
    question: Question;

    @ManyToMany(() => Option, {onDelete: "CASCADE"})
    @JoinTable()
    options: Option[];
}

export default Submission;