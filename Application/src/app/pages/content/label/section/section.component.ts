import { Component, OnInit } from '@angular/core';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['../../../pages.component.css'],
})
export class SectionComponent implements OnInit {

  /** Liste des Rubriques (NAME/TYPE)*/
  sections: Section[] = [];
  /** Colonnes à afficher dans le tableau des Rubriques */
  sectionColumns: string[] = ['id', 'name', 'type', 'remove'];
  /** Enum Type*/
  enumTypeList = Object.values(EnumSectionType);
  /** Le dernier identifiant */
  lastId: number = 0;

  /**
   * Constructeur du composant SectionComponent 
   * 
   * @param sectionService - SectionService - Injection du service SectionService
   */
  constructor(private sectionService: SectionService) { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Rubriques
   */
  public ngOnInit(): void {
    //Appel du Service - Récupère toutes les Rubriques en base
    this.sections = this.sectionService.readSections();

    this.lastId = this.sectionService.readLastId();
  }

  /**
   * Créer dans la base une rubrique avec la paire name/type
   * 
   * @param id - number - L'identifiant de la rubrique à créer
   * @param name - string - Le libellé de la rubrique à créer
   * @param type - string - Le type de la rubrique à créer
   */
  public createSection(id: string, name: string, type: string): void {

    let idN: number = Number(id);

    // On vérifie si la Rubrique existe ...
    if (!this.controlSection(name, type)) {

      //... Si non, on formatte le nom...
      name = this.sectionService.formatSectionName(name, type);
      // ...puis on la créer...
      let section = new Section(idN, name, type);
      //... et on l'ajoute en base
      this.sectionService.createSection(section);
    }
  }

  /**
   * Récupère dans la base les informations d'une Rubrique par rapport à son nom et son type
   * 
   * @param id - number - L'identifiant de la Rubrique à lire
   */
  public readSection(id: string) {

    let idN: number = Number(id);

    //Appel du service - Récupère une Rubrique par rapport à son nom et son type.
    this.sectionService.readSection(idN);
  }

  /**
   * Modifie la Rubrique correspondante a celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à modifier
   */
  public updateSection(section: Section){

    //Appel du service - Modifie la Rubrique.
    this.sectionService.updateSection(section);
  }

  /**
   * Supprime la Rubrique correspondante à la ligne
   * 
   * @param section - Section - La section à supprimer
   */
  public deleteSection(section: Section) {

    // On vérifie si la Rubrique existe... 
    if (this.controlSection(section.name, section.type)) {

      //... et si une données l'utilise !
      if (true) {

        //... alors Appel du service - Supprime la Rubrique.
        this.sectionService.deleteSection(section);
      } else {
        alert("Une donnée utilise la Rubrique. Veuillez la modifier");
      }
    } else {
      alert("La rubrique n'existe pas");
    }
  }

  /**
   * Contrôle dans la base si une rubrique n'existe pas déjà avec la paire name/type
   * 
   * @param name - string - Le libellé de la rubrique à contrôler
   * @param type - string - Le type de la rubrique à contrôler
   */
  public controlSection(name: string, type: string): boolean {

    //Appel du service - Contrôle une Rubrique par rapport à son nom et son type.
    return this.sectionService.controlSection(name, type);
  }
}