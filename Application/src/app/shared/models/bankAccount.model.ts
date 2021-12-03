import { Entity } from "../interfaces/entity.interface";

/**
 * L'objet modélisant les Comptes bancaires dans l'application
 *
 * @implements Entity
 */
export class BankAccount implements Entity {

  /** Identifiant Firestore */
  id: string;

  /** Identifiant FireAuthentication de l'Utilisateur */
  idUser: string

  /** Identifiant du compte pour un utilisateur */
  idBase: number

  /** Nom du compte ("Compte Courant", "Livret A", etc.) */
  name: string;

  /** Type de compte (Courant / Epargne) */
  type: string;

  /** Montant du compte calculé a partir des transactions */
  totalAmount: number;

  /** Boolean permettant de savoir si le compte a été supprimé
   * Si true, le compte ne doit plus apparaitre dans les choix et les tableaux */
  isDeleted: boolean

  /**
   * Constructeur de la classe model BankAccount
   *
   * @param {string} id - Identifiant Firestore
   * @param {number} idBase - Identifiant FireAuthentication de l'Utilisateur
   * @param {string} name - Nom du compte
   * @param {string} type - Type de compte
   * @param {number} totalAmount - Montant du compte calculé a partir des transactions
   * @param {string} idUser - Identifiant du compte pour un utilisateur
   * @param {boolean} isDeleted - Boolean permettant de savoir si le compte a été supprimé
   */
  constructor(id: string, idBase: number, name: string, type: string, totalAmount: number, idUser: string, isDeleted: boolean) {
    this.id = id;
    this.idBase = idBase;
    this.name = name;
    this.type = type;
    this.idUser = idUser;
    this.totalAmount = totalAmount;
    this.isDeleted = isDeleted;
  }
}