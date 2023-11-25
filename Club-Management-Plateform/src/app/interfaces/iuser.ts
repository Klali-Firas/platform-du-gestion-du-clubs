export interface User {
    _id?: string;
    clubName: string;
    clubDescription: string;
    email: string;
    password: string;
    tel?: number;
    etat?: boolean;
    isAdmin?: boolean;
    roles?: string[];
    exclusiveRoles?: string[]
}
