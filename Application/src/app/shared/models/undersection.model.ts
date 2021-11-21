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

    /** L'identifiant de la sous rubrique */
    id: number;
    /** Le nom de la sous rubrique */
    name: string;
    /** La rubrique mère */
    section: Section;
    /** L'indicateur de la présence dans la tableau récapitulatif */
    inTab: boolean;

    /**
     * Constructeur de la classe Undersection
     * 
     * @param id - number - L'identifiant de la sous rubrique
     * @param name - string - Le nom de la rubrique
     * @param section - Undersection - La rubrique mère
     * @param inTab - boolean - Determine l'affichage dans le tableau ou non
     */
    constructor(id: number, name: string, section: Section, inTab: boolean) {
        this.id = id;
        this.name = name;
        this.section = section;
        this.inTab = inTab;
    }
}