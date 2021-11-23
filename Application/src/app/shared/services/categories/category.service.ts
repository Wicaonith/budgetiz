import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, Query } from '@angular/fire/firestore';
import { Category } from '../../models/category.model';
import { FirestoreCrudService } from '../firestoreCrud.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
/**
 * 
 */
export class CategoryService {

  // Path de la BDD Firebase pour la table Category
  private dbPath = '/categories';

  crudService: FirestoreCrudService<Category>;


  constructor(afs: AngularFirestore, private utils: UtilsService) {
    this.crudService = new FirestoreCrudService<Category>(afs, this.dbPath);
  }

  public createCategory(category: Category): any {

    // Insertion en base de la Catégories
    return this.crudService.add({ ...category }).then(() => {
      this.log(`Création de la Catégories n°${category.idBase}`); // Lorsque la création se passe bien
    });
  }

  public readCategories(): any {
    return this.crudService.list();
  }

  public readCategoriesByUserId(): Query<DocumentData> {

    return this.crudService.listByUser(this.utils.getUserUID());
  }


  public readCategory(id: string): any {
    return this.crudService.get(id);
  }

  public updateCategory(category: Category): any {

    return this.crudService.update({ ...category }).then(() => {
      console.log(`Modification de la Catégories n°${category.idBase}`); // Lorsque la modification se passe bien
    });
  }

  public deleteCategory(id: string): any {
    return this.crudService.delete(id).then(() => {
      console.log(`Suppression de la Catégories`); // Lorsque la suppression se passe bien
    });
  }

  private log(log: string) {
    console.info(log);
  }
}