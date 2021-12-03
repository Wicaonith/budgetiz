import { Entity } from "../interfaces/entity.interface";
import { Category } from "./category.model";

/**
 * L'objet modélisant les Sous catégoriess dans l'application
 *
 * @implements Entity
 */
export class Undercategory implements Entity {

  /** Identifiant Firestore */
  id: string;

  /** Identifiant FireAuthentication de l'Utilisateur */
  idUser: string;

  /** Identifiant de la sous-catégorie pour un utilisateur */
  idBase: number;

  /** Nom de la sous-catégories */
  name: string;

  /** Catégories mère */
  category: Category;

  /** Indicateur de la présence dans la tableau récapitulatif */
  inTab: boolean;

  /** Boolean permettant de savoir si le compte a été supprimé
   * Si true, le compte ne doit plus apparaitre dans les choix et les tableaux */
  isDeleted: boolean

  /**
   * Constructeur de la classe model Undercategory
   *
   * @param {string} id - Identifiant Firestore
   * @param {number} idBase - Identifiant de la sous-catégorie pour un utilisateur
   * @param {string} name - Nom de la sous-catégories
   * @param {Category} category - Catégories mère
   * @param {boolean} inTab - Indicateur de la présence dans la tableau récapitulatif
   * @param {string} idUser - Identifiant FireAuthentication de l'Utilisateur
   * @param {boolean} isDeleted - Boolean permettant de savoir si le compte a été supprimé
   */
  constructor(id: string, idBase: number, name: string, category: Category, inTab: boolean, idUser: string, isDeleted: boolean) {
    this.id = id;
    this.idBase = idBase;
    this.name = name;
    this.category = category;
    this.inTab = inTab;
    this.idUser = idUser;
    this.isDeleted = isDeleted;
  }
}
