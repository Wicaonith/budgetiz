import { Injectable } from '@angular/core';
import { TEST_UNDERSECTION } from '../mock/mock-undersection';
import { Undersection } from '../models/undersection';

@Injectable({
  providedIn: 'root',
})
export class UndersectionService {

  /**
   * Créer la Sous-Rubrique à créer
   * 
   * @param undersection - Undersection - La sous-Rubrique à creer
   */
  public createUndersection(undersection: Undersection) {

    //TODO
  }

  /**
   * Récupère dans la base les informations de toutes les Sous-Rubriques
   * 
   * @returns Undersection[] - Liste des Sous-Rubriques
   */
  public readUndersections(): Undersection[] {

    //TODO
    return TEST_UNDERSECTION;
  }

  /**
   * Récupère dans la base les informations d'une Sous-Rubrique par rapport à son identifiant
   * 
   * @param id - number - L'identifiant de la Rubrique à lire
   * 
   * @returns Section - La Sous-Rubrique lié à l'ID
   */
  public readUndersection(id: number): Undersection {

    // Récupération de toutes les Sous-Rubriques
    let sections = this.readUndersections();
    let retour!: Undersection;

    for (let section of sections) {
      if (section.id === id) {
        retour = section;
      }
    }
    // Cas où la Sous-Rubrique n'existe pas.
    return retour;
  }

  /**
   * Modifie la Sous-Rubrique correspondante a celle passé en paramètre
   * 
   * @param undersection - Undersection - La Sous-Rubrique à modifier
   */
  public updateUndersection(undersection: Undersection) {
    //TODO
  }

  /**
   * Supprime la Sous-Rubrique correspondante à celle passé en paramètre
   * 
   * @param undersection - Undersection - La Sous-Rubrique à supprimer
   */
  public deleteUndersection(undersection: Undersection) {
    //TODO
  }

  /**
   * Contrôle l'existance dans la base d'une Sous-Rubrique par rapport à son nom et sa Rubrique mère
   * 
   * @param name - string - Le nom de la Sous-Rubrique à controler
   * @param sectionId - string - L'identifiant de la Rubrique mère à controler
   * 
   * @returns boolean - true si elle existe
   */
  public controlUndersection(name: string, sectionId: string): boolean {

    let sectionIdN = Number(sectionId);

    // Récupération de toutes les Sous-Rubriques
    let undersections = this.readUndersections();

    // On parcourt toutes les Sous-Rubriques...
    for (let undersection of undersections) {
      // ... et s'il en existe une similaire...
      if (undersection.name === name && undersection.section.id === sectionIdN) {
        //... on retourne true
        return true;
      }
    }
    // Cas où la Sous-Rubrique n'existe pas.
    return false;
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
    let undersections = this.readUndersections();

    // On parcourt toutes les Rubriques...
    for (let undersection of undersections) {
      // ... et s
      if (undersection.id > lastId) {
        lastId = undersection.id;
      }
    }
    // Retourne le dernier ID + 1 
    return lastId + 1;
  }
}
