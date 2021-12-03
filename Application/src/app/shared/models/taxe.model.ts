import { Entity } from "../interfaces/entity.interface";

/**
 * L'objet modélisant les Taxe (impôts) dans l'application
 *
 * @implements Entity
 */
export class Taxe implements Entity {

  /** Identifiant Firestore */
  id: string;

  /** Identifiant FireAuthentication de l'Utilisateur */
  idUser: string;

  /** Année d'imposition */
  year: number;

  /** Net imposable */
  netTaxable: number;

  /** Liste des prélevements à la source effectuées */
  datas: Map<string, number>;

  /** Boolean permettant de savoir si le compte a été supprimé
   * Si true, le compte ne doit plus apparaitre dans les choix et les tableaux */
  isDeleted: boolean

  /**
   * Constructeur de la classe model Taxe
   *
   * @param {string} id - Identifiant Firestore
   * @param {string} idUser - Identifiant FireAuthentication de l'Utilisateur
   * @param {number} year - Année d'imposition
   * @param {number} netTaxable - Net imposable
   * @param {Map<string, number>} datas - Liste des prélevements à la source effectuées
   * @param {boolean} isDeleted -  Boolean permettant de savoir si le compte a été supprimé
   */
  public constructor(id: string, idUser: string, year: number, netTaxable: number, datas: Map<string, number>, isDeleted: boolean) {
    this.id = id;
    this.idUser = idUser;
    this.year = year;
    this.netTaxable = netTaxable;
    this.datas = datas;
    this.isDeleted = isDeleted;
  }
}
