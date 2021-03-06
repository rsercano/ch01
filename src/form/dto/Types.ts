export interface OptionDto {
    id: number;
    label: string;
    questionId?: string;
}

export interface QuestionDto {
    id: number;
    label: string;
    required: boolean;
    options?: OptionDto[];
    formId?: number;
}

export interface FormDto {
    id: number;
    label: string;
    questions?: QuestionDto[];
}

export interface Submission {
    id: string;
    userId: string;
    questionId: string;
    optionId: string;
}