import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Submission from "./Submission";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {nullable: false})
    firstName: string;

    @Column('text', {nullable: false})
    lastName: string;

    @Column('text', {nullable: false})
    email: string;

    @Column('text', {nullable: false})
    password: string;

    @Column('bit', {nullable: false})
    role: number;

    @OneToMany(() => Submission,
        submission => submission.user
    )
    submissions?: Submission[];

    //TODO hash password before insert
}

export default User;