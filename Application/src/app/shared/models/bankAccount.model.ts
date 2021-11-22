import { Entity } from "../services/firestoreCrud.service";

/**
 * L'objet modélisant les Comptes bancaires dans l'application
 */
export class BankAccount implements Entity {

    id: string;

    /** L'identifiant du compte */
    idBase: number

    /** Le nom du compte ("Compte Courant", "Livret A", etc.) */
    name: string;

    /** Le type de compte (Courant / Epargne) */
    type: string;

    idUser: string

    /**
     * Constructeur de la classe BankAccount
     * 
     * @param id - number - L'identifiant du compte
     * @param name - string - Le nom du compte ("Compte Courant", "Livret A", etc.) 
     * @param type - string - Le type de compte (Courant / Epargne)
     */
    constructor(id: string, idBase: number, name: string, type: string, idUser: string) {
        this.id = id;
        this.idBase = idBase;
        this.name = name;
        this.type = type;
        this.idUser = idUser;
    }
}