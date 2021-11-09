import { Injectable } from '@angular/core';
import { TEST_SECTION } from '../mock/mock-section';
import { Section } from '../models/section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  /**
   * Créer une Rubrique dans la base
   * 
   * @param section - Section - La Rubrique à créer
   */
  public createSection(section: Section) {
    //TODO 
  }

  /**
   * Récupère dans la base les informations de toutes les Rubriques
   * 
   * @returns Section[] - Liste des Rubriques
   */
  public readSections(): Section[] {
    //TODO 
    return TEST_SECTION;
  }

  /**
   * Récupère dans la base les informations d'une Rubrique par rapport à son nom et son type.
   * 
   * @param id - number - L'identifiant de la Rubrique à lire
   * 
   * @returns Section - La Rubrique lié à l'ID
   */
  public readSection(id: number): Section {

    // Récupération de toutes les Rubriques
    let sections = this.readSections();
    let retour!: Section;

    for (let section of sections) {
      if (section.id === id) {
        retour = section;
      }
    }
    // Cas où la Rubrique n'existe pas.
    return retour;
  }

  /**
   * Modifie la Rubrique correspondante a celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à modifier
   */
  updateSection(section: Section){
    //TODO 
  }

  /**
   * Supprime la Rubrique correspondante à celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à supprimer
   */
  public deleteSection(section: Section) {
    //TODO 
  }

  /**
   * Contrôle l'existance dans la base d'une Rubrique par rapport à son nom et son type.
   * 
   * @param name - string - Le nom de la Rubrique à controler
   * @param type - string - Le type de la Rubrique à controler
   * 
   * @returns Section - La Rubrique
   */
  public controlSection(name: string, type: string): boolean {

    // Récupération de toutes les Rubriques
    let sections = this.readSections();

    // On parcourt toutes les Rubriques...
    for (let section of sections) {
      // ... et s'il en existe une similaire...
      if (section.name === name && section.type === type) {
        //... on retourne true
        return true;
      }
    }
    // Cas où la Rubrique n'existe pas.
    return false;
  }

  /**
   * Formatte le nom de la Rubrique sous la forme "[R] Salaire"
   * [1ere lettre du type] + Nom 
   * 
   * @param name - string - Le libellé à formatter
   * @param type - string - Le type nécessaire au formattage
   * 
   * @returns string - Le nom de la Rubrique formatté
   */
  public formatSectionName(name: string, type: string): string {

    return "[" + type.substr(0, 1) + "] " + name;
  }

  /**
   * Récupère dans la base l'identifiant de la derniere Rubrique créé
   * 
   * @returns number - L'identifiant le plus grand
   */
  public readLastId(): number {

    // Variable de retour
    let lastId = 0;

    // Récupération de toutes les Rubriques
    let sections = this.readSections();

    // On parcourt toutes les Rubriques...
    for (let section of sections) {
      // ... et s
      if (section.id > lastId) {
        lastId = section.id;
      }
    }
    // Retourne le dernier ID + 1 
    return lastId + 1;
  }
}