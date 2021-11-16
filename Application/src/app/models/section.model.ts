import { Entity } from "../services/firestoreCrud.service";

/**
 * L'objet modélisant les Rubriques dans l'application
 * 
 * @attribut id - string - L'identifiant de la rubrique
 * @attribut name - string - Le nom de la rubrique
 * @attribut type - string - Le type de rubrique (Charge / Revenu)
 */
export class Section implements Entity {

    /** L'identifiant de la rubrique */
    id: string

    /** Le nom de la rubrique */
    name: string;

    /** Le type de rubrique (Charge / Revenu) */
    type: string;

    constructor(id: string, name: string, type: string) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}