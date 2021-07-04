import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Option from "./Option";
import Form from "./Form";

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
        {
            cascade: true,
            onDelete: "CASCADE"
        }
    )
    options: Option[];

    @ManyToOne(() => Form,
        form => form.questions)
    form: Form;
}

export default Question;
