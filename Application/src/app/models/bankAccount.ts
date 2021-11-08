/**
 * L'objet modélisant les Comptes bancaires dans l'application
 */
export class BankAccount{

    /** Le nom du compte ("Compte Courant", "Livret A", etc.) */
    name: string; 

    /** Le type de compte (Courant / Epargne) */
    type: string;

    /**
     * Constructeur de la classe BankAccount
     * 
     * @param name - string - Le nom du compte ("Compte Courant", "Livret A", etc.) 
     * @param type - string - Le type de compte (Courant / Epargne)
     */
    constructor(name :string, type: string){
        
        this.name = name;
        this.type = type;
    }
}