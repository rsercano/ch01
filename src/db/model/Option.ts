import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Question from "./Question";
import Submission from "./Submission";

@Entity()
export class Option {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {nullable: false})
    label: string;

    @ManyToOne(() => Question,
        question => question.options,
        {onDelete: "CASCADE"})
    question: Question;

    @ManyToMany(() => Submission,
        sub => sub.question
    )
    submissions: Submission[];
}

export default Option;
