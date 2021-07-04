import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Option from "./Option";
import Form from "./Form";
import Submission from "./Submission";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {nullable: false})
    label: string;

    @Column('boolean', {nullable: false})
    required: boolean;

    @OneToMany(() => Option,
        option => option.question,
        {cascade: true}
    )
    options: Option[];

    @ManyToOne(() => Form,
        form => form.questions, {onDelete: "CASCADE"})
    form: Form;

    @OneToMany(() => Submission,
        sub => sub.question
    )
    submissions?: Submission[];
}

export default Question;
