import User from "../../db/model/User";

export interface OptionDto {
    id: number;
    label: string;
}

export interface QuestionDto {
    id: number;
    label: string;
    required: boolean;
    options?: OptionDto[];
}

export interface FormDto {
    id: number;
    label: string;
    questions?: QuestionDto[];
}

export interface Submission {
    id: string;
    user: User;
    questions: QuestionDto[];
}