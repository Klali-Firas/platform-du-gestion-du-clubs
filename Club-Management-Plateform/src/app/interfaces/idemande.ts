export interface IDemande {
    _id?: string;
    clubID: string;
    objet: string;
    description: string;
    etat?: 'accepter' | 'refuser' | 'en cours';
    dateDem?: Date; // Add a question mark if this field is optional
    reponse?: string
}