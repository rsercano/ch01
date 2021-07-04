export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export enum Role {
    ADMIN = 1,
    USER = 2
}