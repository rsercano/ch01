import {Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
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

    @OneToOne(() => Question)
    @JoinColumn()
    question: Question;

    @OneToOne(() => Option)
    @JoinColumn()
    option: Option;
}

export default Submission;