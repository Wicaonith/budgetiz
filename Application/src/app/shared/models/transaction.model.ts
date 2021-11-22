import { Entity } from "../services/firestoreCrud.service";
import { BankAccount } from "./bankAccount.model";
import { Section } from "./section.model";
import { Undersection } from "./undersection.model";


/**
 * L'objet modélisant les transactions dans l'application
 */
export class Transaction implements Entity {

    id: string;
    /** L'identifiant de la transaction */
    idBase: number;
    /** Le mois de la transaction */
    month: string;
    /** La date de la transaction */
    date: Date;
    /** Le montant de la transaction */
    amount: number;
    /** La sous rubrique de la transaction */
    undersection: Undersection;
    /** Le compte ayant la transaction */
    account: BankAccount;

    idUser: string;

    constructor(id: string, idBase: number, month: string, date: Date, amount: number, section: Section, undersection: Undersection, account: BankAccount, idUser: string) {
        this.id = id;
        this.idBase = idBase;
        this.month = month;
        this.date = date;
        this.amount = amount;
        this.undersection = undersection;
        this.account = account;
        this.idUser = idUser;
    }
}