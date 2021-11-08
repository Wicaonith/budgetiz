import { UnderSection } from "./underSection";


/**
 * L'objet modélisant les Rubriques dans l'application
 */
export class Section {
    
    /** Le nom de la rubrique */
    name: string; 

    /** L'objet de la sous rubrique */
    underSections: UnderSection[];

    /** Le type de rubrique (Charge / Revenu) */
    type: string;

    /**
     * Constructeur de la classe Section
     * Initialiser avec un tableau de sous rubrique
     * 
     * @param name - string - Le nom de la rubrique
     * @param underSection  - UnderSection[] - Un tableau d'objet sous rubrique
     * @param type - string - Le type de rubrique (Charge / Revenu)
     */
    constructor(name: string, underSections: UnderSection[], type: string){

        this.name = name;
        this.underSections = underSections;
        this.type = type;
    }
}