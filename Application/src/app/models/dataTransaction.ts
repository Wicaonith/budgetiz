import { BankAccount } from "./bankAccount";
import { Section } from "./section";


/**
 * L'objet modélisant les transactions dans l'application
 */
export class DataTransaction {

    /** L'identifiant de la transaction */
    id: number;
    /** Le mois de la transaction */
    month: string;
    /** Le montant de la transaction */
    amount: number;
    /** La rubrique de la transaction */
    section: Section;
    /** Le compte ayant la transaction */
    account: BankAccount;


    /**
     * Contructeur de la classe DataTransaction
     * 
     * @param id - number - L'identifiant de la transaction
     * @param month - string - Le mois de la transaction
     * @param amount - number - Le montant de la transaction
     * @param section - Section - La rubrique de la transaction
     * @param account - BankAccount - Le compte ayant la transaction
     */
    constructor(id: number, month: string, amount:number, section: Section, account: BankAccount){

        this.id = id;
        this.month = month;
        this.amount = amount;
        this.section = section;
        this.account = account;
    }
}