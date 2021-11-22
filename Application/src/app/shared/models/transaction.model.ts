import { Entity } from "../services/firestoreCrud.service";
import { BankAccount } from "./bankAccount.model";
import { Section } from "./section.model";
import { Undersection } from "./undersection.model";


/**
 * L'objet modélisant les transactions dans l'application
 */
export class Transaction implements Entity {

    /** Identifiant Firebase */
    id: string;
    /** L'identifiant de la transaction */
    idBase: number;
    /** L'année de la transaction */
    year: number;
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

    constructor(id: string, idBase: number, year: number, month: string, date: Date, amount: number, undersection: Undersection, account: BankAccount, idUser: string) {
        this.id = id;
        this.idBase = idBase;
        this.year = year;
        this.month = month;
        this.date = date;
        this.amount = amount;
        this.undersection = undersection;
        this.account = account;
        this.idUser = idUser;
    }
}