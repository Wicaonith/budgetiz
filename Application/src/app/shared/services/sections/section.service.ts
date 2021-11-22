import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, Query } from '@angular/fire/firestore';
import { Section } from '../../models/section.model';
import { FirestoreCrudService } from '../firestoreCrud.service';
import { UtilsService } from '../utils/utils.service';

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


  constructor(afs: AngularFirestore, private utils: UtilsService) {
    this.crudService = new FirestoreCrudService<Section>(afs, this.dbPath);
  }

  public createSection(section: Section): any {

    // Insertion en base de la Rubrique
    return this.crudService.add({ ...section }).then(() => {
      this.log(`Création de la Rubrique n°${section.idBase}`); // Lorsque la création se passe bien
    });
  }

  public readSections(): any {
    return this.crudService.list();
  }

  public readSectionsByUserId(): Query<DocumentData> {

    return this.crudService.listByUser(this.utils.getUserUID());
  }


  public readSection(id: string): any {
    return this.crudService.get(id);
  }

  public updateSection(section: Section): any {

    return this.crudService.update({ ...section }).then(() => {
      console.log(`Modification de la Rubrique n°${section.idBase}`); // Lorsque la modification se passe bien
    });
  }

  public deleteSection(id: string): any {
    return this.crudService.delete(id).then(() => {
      console.log(`Suppression de la Rubrique`); // Lorsque la suppression se passe bien
    });
  }

  private log(log: string) {
    console.info(log);
  }
}