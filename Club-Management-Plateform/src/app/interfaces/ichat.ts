export interface Chat {
    clubName: string;
    club: string; // Assuming 'club' is the User ID
    content: { message: string, isAdmin: boolean, timestamp: Date }[];
}