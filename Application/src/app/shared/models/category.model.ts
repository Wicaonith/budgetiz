import { Entity } from "../interfaces/entity.interface";

/**
 * L'objet modélisant les Catégories dans l'application
 *
 * @implements Entity
 */
export class Category implements Entity {

  /** Identifiant Firestore */
  id: string;

  /** Identifiant FireAuthentication de l'Utilisateur */
  idUser: string;

  /** Identifiant de la catégorie pour un utilisateur */
  idBase: number

  /** Nom de la catégorie */
  name: string;

  /** Type de catégories (Charge / Revenu / Provision / Epargne) */
  type: string;

  /** Boolean permettant de savoir si le compte a été supprimé
  * Si true, le compte ne doit plus apparaitre dans les choix et les tableaux */
  isDeleted: boolean

  /**
   * Constructeur de la classe model Category
   *
   * @param {string} id - Identifiant Firestore
   * @param {number} idBase - Identifiant de la catégorie
   * @param {string} name - Nom de la catégorie
   * @param {string} type - Type de catégories
   * @param {string} idUser - Identifiant FireAuthentication de l'Utilisateur
   * @param {boolean} isDeleted - Boolean permettant de savoir si le compte a été supprimé
   */
  constructor(id: string, idBase: number, name: string, type: string, idUser: string, isDeleted: boolean) {
    this.id = id;
    this.idBase = idBase;
    this.name = name;
    this.type = type;
    this.idUser = idUser;
    this.isDeleted = isDeleted;
  }
}
