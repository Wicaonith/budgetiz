import { Entity } from "../services/firestoreCrud.service";
import { Section } from "./section.model";

/**
 * L'objet modélisant les Sous rubriques dans l'application
 * 
 * @attribut id - number - L'identifiant de la sous rubrique
 * @attribut name - string - Le nom de la sous rubrique
 * @attribut section - Section - La rubrique mère
 * @attribut inTab - boolean - L'indicateur de la présence dans la tableau récapitulatif
 */
export class Undersection implements Entity {
    id: string;
    /** L'identifiant de la sous rubrique */
    idBase: number;
    /** Le nom de la sous rubrique */
    name: string;
    /** La rubrique mère */
    section: Section;
    /** L'indicateur de la présence dans la tableau récapitulatif */
    inTab: boolean;

    idUser: string;


    constructor(id: string, idBase: number, name: string, section: Section, inTab: boolean, idUser: string) {
        this.id = id;
        this.idBase = idBase;
        this.name = name;
        this.section = section;
        this.inTab = inTab;
        this.idUser = idUser;
    }
}