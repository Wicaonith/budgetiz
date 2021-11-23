import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, Query } from '@angular/fire/firestore';
import { Undercategory } from '../../models/undercategory.model';
import { FirestoreCrudService } from '../firestoreCrud.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class UndersectionService {

  private dbPath = '/undercategories';

  crudService: FirestoreCrudService<Undercategory>;

  // AngularFirestore should be found by Angular DI System
  constructor(afs: AngularFirestore, private utils: UtilsService) {
    // Let's create our CrusService and use the a Collection with the name 'categories'
    this.crudService = new FirestoreCrudService<Undercategory>(afs, this.dbPath);
  }


  /**
   * Créer la Sous-Catégories à créer
   * 
   * @param undercategory - Undercategory - La sous-Catégories à creer
   */
  public createUndersection(undercategory: Undercategory): any {

    // Insertion en base de la Sous-Catégories
    return this.crudService.add({ ...undercategory }).then(() => {
      this.log(`Création de la Sous-Catégories n°${undercategory.id}`); // Lorsque la création se passe bien
    });
  }

  public readUndersections(): any {

    return this.crudService.list();
  }

  /**
   * Récupère dans la base les informations de toutes les Sous-Catégoriess
   * 
   * @returns Undercategory[] - Liste des Sous-Catégoriess
   */
  public readUndersectionsByUserId(): Query<DocumentData> {

    return this.crudService.listByUser(this.utils.getUserUID());
  }

  /**
   * Récupère dans la base les informations d'une Sous-Catégories par rapport à son identifiant
   * 
   * @param id - number - L'identifiant de la Sous-Catégories à lire
   * 
   * @returns Category - La Sous-Catégories lié à l'ID
   */
  public readUndersection(id: string): any {

    return this.crudService.get(id);
  }

  /**
   * Modifie la Sous-Catégories correspondante a celle passé en paramètre
   * 
   * @param undercategory - Undercategory - La Sous-Catégories à modifier
   */
  public updateUndersection(undercategory: Undercategory): any {

    return this.crudService.update({ ...undercategory }).then(() => {
      console.log(`Modification de la Sous-Catégories n°${undercategory.id}`); // Lorsque la modification se passe bien
    });
  }

  /**
   * Supprime la Sous-Catégories correspondante à celle passé en paramètre
   * 
   * @param undercategory - Undercategory - La Sous-Catégories à supprimer
   */
  public deleteUndersection(id: string): any {

    return this.crudService.delete(id).then(() => {
      console.log(`Suppression de la Catégories n°${id}`); // Lorsque la suppression se passe bien
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
