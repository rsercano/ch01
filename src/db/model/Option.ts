import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Question from "./Question";

@Entity()
export class Option {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {nullable: false})
    label: string;

    @ManyToOne(() => Question,
        question => question.options)
    question: Question;
}

export default Option;
