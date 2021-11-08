import { Section } from "./section";


/**
 * L'objet modélisant les Sous rubriques dans l'application
 * @extends Section
 */
export class UnderSection {

    /** Le nom de la sous rubrique */
    name: string;

    /** La rubrique mère */
    section : Section;

    /** L'indicateur de la présence dans la tableau récapitulatif */
    inTab: boolean; 
    
    
    /**
     * Constructeur de la classe Section
     * Initialiser avec un tableau de sous rubrique
     * 
     * @param name - string - Le nom de la rubrique
     * @param section - UnderSection - La rubrique mère
     * @param inTab - boolean - Determine l'affichage dans le tableau ou non
     */
    constructor(name: string, section: Section, inTab: boolean){
        this.name = name;
        this.section = section;
        this.inTab = inTab;
    }
}