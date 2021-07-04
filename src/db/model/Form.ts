import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Question from "./Question";

@Entity()
export class Form {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {nullable: false})
    label: string;

    @OneToMany(() => Question,
        question => question.form,
        {
            cascade: true,
            onDelete: "CASCADE"
        }
    )
    questions: Question[];
}

export default Form;
