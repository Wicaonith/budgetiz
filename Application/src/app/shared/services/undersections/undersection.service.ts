import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, Query } from '@angular/fire/firestore';
import { Undersection } from '../../models/undersection.model';
import { FirestoreCrudService } from '../firestoreCrud.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class UndersectionService {

  private dbPath = '/undersections';

  crudService: FirestoreCrudService<Undersection>;

  // AngularFirestore should be found by Angular DI System
  constructor(afs: AngularFirestore, private utils: UtilsService) {
    // Let's create our CrusService and use the a Collection with the name 'sections'
    this.crudService = new FirestoreCrudService<Undersection>(afs, this.dbPath);
  }


  /**
   * Créer la Sous-Rubrique à créer
   * 
   * @param undersection - Undersection - La sous-Rubrique à creer
   */
  public createUndersection(undersection: Undersection): any {

    // Insertion en base de la Sous-Rubrique
    return this.crudService.add({ ...undersection }).then(() => {
      this.log(`Création de la Sous-Rubrique n°${undersection.id}`); // Lorsque la création se passe bien
    });
  }

  public readUndersections(): any {

    return this.crudService.list();
  }

  /**
   * Récupère dans la base les informations de toutes les Sous-Rubriques
   * 
   * @returns Undersection[] - Liste des Sous-Rubriques
   */
  public readUndersectionsByUserId(): Query<DocumentData> {

    return this.crudService.listByUser(this.utils.getUserUID());
  }

  /**
   * Récupère dans la base les informations d'une Sous-Rubrique par rapport à son identifiant
   * 
   * @param id - number - L'identifiant de la Sous-Rubrique à lire
   * 
   * @returns Section - La Sous-Rubrique lié à l'ID
   */
  public readUndersection(id: string): any {

    return this.crudService.get(id);
  }

  /**
   * Modifie la Sous-Rubrique correspondante a celle passé en paramètre
   * 
   * @param undersection - Undersection - La Sous-Rubrique à modifier
   */
  public updateUndersection(undersection: Undersection): any {

    return this.crudService.update({ ...undersection }).then(() => {
      console.log(`Modification de la Sous-Rubrique n°${undersection.id}`); // Lorsque la modification se passe bien
    });
  }

  /**
   * Supprime la Sous-Rubrique correspondante à celle passé en paramètre
   * 
   * @param undersection - Undersection - La Sous-Rubrique à supprimer
   */
  public deleteUndersection(id: string): any {

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
