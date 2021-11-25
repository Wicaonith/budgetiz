import { Entity } from "../services/firestoreCrud.service";

/**
 * L'objet modélisant les Comptes bancaires dans l'application
 */
export class BankAccount implements Entity {

    id: string;
    idUser: string

    /** L'identifiant du compte */
    idBase: number

    /** Le nom du compte ("Compte Courant", "Livret A", etc.) */
    name: string;

    /** Le type de compte (Courant / Epargne) */
    type: string;

    totalAmount: number;

    constructor(id: string, idBase: number, name: string, type: string, totalAmount: number, idUser: string) {
        this.id = id;
        this.idBase = idBase;
        this.name = name;
        this.type = type;
        this.idUser = idUser;
        this.totalAmount = totalAmount;
    }
}