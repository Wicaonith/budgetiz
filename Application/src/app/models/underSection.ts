import { Section } from "./section";


/**
 * L'objet modélisant les Sous rubriques dans l'application
 * @extends Section
 */
export class UnderSection extends Section {

    /** L'indicateur de la présence dans la tableau récapitulatif */
    inTab: boolean; 
    
    
    /**
     * Constructeur de la classe Section
     * Initialiser avec un tableau de sous rubrique
     * 
     * @param name - string - Le nom de la rubrique
     * @param underSection  - UnderSection[] - Un tableau d'objet sous rubrique
     * @param type - string - Le type de rubrique (Charge / Revenu)
     */
    constructor(name: string, underSections: UnderSection[], type: string, inTab: boolean){
        super(name, underSections, type);
        this.inTab = inTab;
    }
}