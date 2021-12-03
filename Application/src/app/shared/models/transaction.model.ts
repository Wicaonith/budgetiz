import { Entity } from "../interfaces/entity.interface";
import { BankAccount } from "./bankAccount.model";
import { Undercategory } from "./undercategory.model";


/**
 * L'objet modélisant les Transactions dans l'application
 *
 * @implements Entity
 */
export class Transaction implements Entity {

  /** Identifiant Firestore */
  id: string;

  /** Identifiant FireAuthentication de l'Utilisateur */
  idUser: string;

  /** Identifiant de la transaction pour un utilisateur */
  idBase: number;

  /** Année de la transaction */
  year: number;

  /** Mois de la transaction */
  month: string

  /** Date de la transaction */
  date: Date;

  /** Montant de la transaction */
  amount: number;

  /** Sous-catégorie de la transaction */
  undercategory: Undercategory;

  /** Compte bancaire de la transaction */
  account: BankAccount;

  /** Description de la transation */
  description: string;

  /** Boolean permettant de savoir si le compte a été supprimé
   * Si true, le compte ne doit plus apparaitre dans les choix et les tableaux */
  isDeleted: boolean

  /**
   * Constructeur de la classe model Transaction
   *
   * @param {string} id - Identifiant Firestore
   * @param {number} idBase - Identifiant de la transaction pour un utilisateur
   * @param {number} year - Année de la transaction
   * @param {string} month - Mois de la transaction
   * @param {Date} date - Date de la transaction
   * @param {number} amount - Montant de la transaction
   * @param {Undercategory} undercategory - Sous-catégorie de la transaction
   * @param {BankAccount} account - Compte bancaire de la transaction
   * @param {string} description - Description de la transation
   * @param {string} idUser - Identifiant FireAuthentication de l'Utilisateur
   * @param {boolean} isDeleted - Boolean permettant de savoir si le compte a été supprimé
   */
  constructor(id: string, idBase: number, year: number, month: string, date: Date, amount: number, undercategory: Undercategory, account: BankAccount, description: string, idUser: string, isDeleted: boolean) {
    this.id = id;
    this.idBase = idBase;
    this.year = year;
    this.month = month;
    this.date = date;
    this.amount = amount;
    this.undercategory = undercategory;
    this.account = account;
    this.description = description;
    this.idUser = idUser;
    this.isDeleted = isDeleted;
  }
}
