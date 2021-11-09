/**
 * L'objet modélisant les Rubriques dans l'application
 * 
 * @attribut id - number - L'identifiant de la rubrique
 * @attribut name - string - Le nom de la rubrique
 * @attribut type - string - Le type de rubrique (Charge / Revenu)
 */
export class Section {
    
    /** L'identifiant de la rubrique */
    id: number;
    
    /** Le nom de la rubrique */
    name: string; 

    /** Le type de rubrique (Charge / Revenu) */
    type: string;

    /**
     * Constructeur de la classe Section
     * Initialiser avec un tableau de sous rubrique
     * 
     * @param id - number - L'identifiant de la rubrique
     * @param name - string - Le nom de la rubrique
     * @param type - string - Le type de rubrique (Charge / Revenu)
     */
    constructor(id: number, name: string, type: string){

        this.id = id;
        this.name = name;
        this.type = type;
    }
}