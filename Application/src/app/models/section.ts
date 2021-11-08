import { UnderSection } from "./underSection";


/**
 * L'objet modélisant les Rubriques dans l'application
 */
export class Section {
    
    /** Le nom de la rubrique */
    name: string; 

    /** Le type de rubrique (Charge / Revenu) */
    type: string;

    /**
     * Constructeur de la classe Section
     * Initialiser avec un tableau de sous rubrique
     * 
     * @param name - string - Le nom de la rubrique
     * @param type - string - Le type de rubrique (Charge / Revenu)
     */
    constructor(name: string, type: string){

        this.name = name;
        this.type = type;
    }
}