export interface Reservation {
    _id?: string;
    clubID: string;
    label?: string;
    reference: string; // Assuming the reference is a string, adjust accordingly if it's a specific type
    onModel: 'Material' | 'Salle' | 'Stand';
    objet: string;
    description: string;
    reponse?: string
    etat: 'accepter' | 'refuser' | 'en cours';
    dateRecu?: Date;
    dateDeb: Date;
    dateFin: Date;
}
