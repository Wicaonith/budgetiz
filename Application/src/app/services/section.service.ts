import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Section } from '../models/section.model';
import { FirestoreCrudService } from './firestoreCrud.service';

@Injectable({
  providedIn: 'root',
})
/**
 * 
 */
export class SectionService {

  // Path de la BDD Firebase pour la table Section
  private dbPath = '/sections';

  crudService: FirestoreCrudService<Section>;

  // AngularFirestore should be found by Angular DI System
  constructor(afs: AngularFirestore) {
    // Let's create our CrusService and use the a Collection with the name 'sections'
    this.crudService = new FirestoreCrudService<Section>(afs, this.dbPath);
  }

  /**
   * Créer une Rubrique dans la base
   * 
   * @param section - Section - La Rubrique à créer
   */
  public createSection(section: Section): any {

    // Insertion en base de la Rubrique
    return this.crudService.add({ ...section }, section.id).then(() => {
      this.log(`Création de la Rubrique n°${section.id}`); // Lorsque la création se passe bien
    });
  }

  /**
   * Récupère dans la base les informations de toutes les Rubriques
   * 
   * @returns Observable<Section[]> - Liste des Rubriques
   */
  public readSections(): any {
    return this.crudService.list();
  }

  /**
   * Récupère dans la base les informations d'une Rubrique par rapport à son nom et son type.
   * 
   * @param id - number - L'identifiant de la Rubrique à lire
   * 
   * @returns Section - La Rubrique lié à l'ID
   */
  public readSection(id: string): any {
    return this.crudService.get(id);
  }

  /**
   * Modifie la Rubrique correspondante a celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à modifier
   */
  public updateSection(section: Section): any {

    return this.crudService.update({ ...section }).then(() => {
      console.log(`Modification de la Rubrique n°${section.id}`); // Lorsque la modification se passe bien
    });
  }

  /**
   * Supprime la Rubrique correspondante à celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à supprimer
   */
  public deleteSection(id: string): any {

    return this.crudService.delete(id).then(() => {
      console.log(`Suppression de la Rubrique n°${id}`); // Lorsque la suppression se passe bien
    });
  }

  /**
   * Permet la gestion de log
   * 
   * @param log - string - 
   */
  private log(log: string) {
    console.info(log);
  }
}