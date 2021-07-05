export interface UserDto {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export enum Role {
    ADMIN = 0,
    USER = 1
}