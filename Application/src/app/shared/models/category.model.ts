import { Entity } from "../services/firestoreCrud.service";

/**
 * L'objet modélisant les Catégoriess dans l'application
 * 
 * @attribut id - number - L'identifiant de la catégories
 * @attribut name - string - Le nom de la catégories
 * @attribut type - string - Le type de catégories (Charge / Revenu)
 */
export class Category implements Entity {

    id: string;

    /** L'identifiant de la catégories */
    idBase: number

    /** Le nom de la catégories */
    name: string;

    /** Le type de catégories (Charge / Revenu) */
    type: string;

    idUser: string;

    isDeleted: boolean

    constructor(id: string, idBase: number, name: string, type: string, idUser: string, isDeleted: boolean) {
        this.id = id;
        this.idBase = idBase;
        this.name = name;
        this.type = type;
        this.idUser = idUser;
        this.isDeleted = isDeleted;
    }
}