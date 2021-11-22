import { Entity } from "../services/firestoreCrud.service";
import { BankAccount } from "./bankAccount.model";
import { Section } from "./section.model";
import { Undersection } from "./undersection.model";


/**
 * L'objet modélisant les transactions dans l'application
 */
export class DataTransaction implements Entity {

    id: string;
    /** L'identifiant de la transaction */
    idBase: number;
    /** Le mois de la transaction */
    month: string;
    /** Le montant de la transaction */
    amount: number;
    /** La rubrique de la transaction */
    section: Section;
    /** La sous rubrique de la transaction */
    undersection: Undersection;
    /** Le compte ayant la transaction */
    account: BankAccount;

    idUser: string;

    constructor(id: string, idBase: number, month: string, amount: number, section: Section, undersection: Undersection, account: BankAccount, idUser: string) {
        this.id = id;
        this.idBase = idBase;
        this.month = month;
        this.amount = amount;
        this.section = section;
        this.undersection = undersection;
        this.account = account;
        this.idUser = idUser;
    }
}