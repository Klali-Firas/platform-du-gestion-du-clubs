export interface Imember {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    roles: { clubId: string; role: string; isExclusive: boolean }[];
}
