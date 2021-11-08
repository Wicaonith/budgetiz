import { Component, OnInit } from '@angular/core';
import { TEST_SECTION } from 'src/app/mock/mock-section';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['../../../pages.component.css']
})
export class SectionComponent implements OnInit {

  /** Liste des Rubriques (NAME/TYPE)*/
  sections: Section[] = [];
  /** Colonnes à afficher dans le tableau des Rubriques */
  sectionColumns: string[] = ['name', 'type', 'remove'];


  /** Enum Type*/
  enumTypeList = Object.values(EnumSectionType);

  constructor() { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Rubriques
   */
  ngOnInit(): void {
    this.sections = TEST_SECTION;
  }

  /**
   * Lit dans la base les informations d'une Rubrique par rapport à son nom et son type
   * 
   * @param name - string - Le nom de la Rubrique à lire
   * @param type - string - La Rubrique mère 
   */
  readSection(name: string, type: string) {

    //Appel du service
  }

  /**
   * Contrôle dans la base si une rubrique n'existe pas déjà avec la paire name/type
   * 
   * @param name - string - Le libellé de la rubrique à contrôler
   * @param type - string - Le type de la rubrique à contrôler
   */
  controlSection(name: string, type: string): void {

    //Appel du service
  }

  /**
   * Créer dans la base une rubrique avec la paire name/type
   * 
   * @param name - string - Le libellé de la rubrique à créer
   * @param type - string - Le type de la rubrique à créer
   */
  createSection(name: string, type: string): void {

    //Appel du service
  }

  /**
   * Supprime la section correspondant a la ligne.
   * 
   * @param section - Section - La section à supprimer
   */
  removeSection(section: Section) {

    console.log("removeSection");
  }

}
