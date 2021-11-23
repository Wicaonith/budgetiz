import { Entity } from "../services/firestoreCrud.service";
import { Category } from "./category.model";

/**
 * L'objet modélisant les Sous catégoriess dans l'application
 * 
 * @attribut id - number - L'identifiant de la sous catégories
 * @attribut name - string - Le nom de la sous catégories
 * @attribut category - Category - La catégories mère
 * @attribut inTab - boolean - L'indicateur de la présence dans la tableau récapitulatif
 */
export class Undercategory implements Entity {
    id: string;
    /** L'identifiant de la sous catégories */
    idBase: number;
    /** Le nom de la sous catégories */
    name: string;
    /** La catégories mère */
    category: Category;
    /** L'indicateur de la présence dans la tableau récapitulatif */
    inTab: boolean;

    idUser: string;


    constructor(id: string, idBase: number, name: string, category: Category, inTab: boolean, idUser: string) {
        this.id = id;
        this.idBase = idBase;
        this.name = name;
        this.category = category;
        this.inTab = inTab;
        this.idUser = idUser;
    }
}