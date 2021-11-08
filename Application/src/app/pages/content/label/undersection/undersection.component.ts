import { Component, OnInit } from '@angular/core';
import { TEST_SECTION } from 'src/app/mock/mock-section';
import { TEST_UNDERSECTION } from 'src/app/mock/mock-undersection';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';
import { UnderSection } from 'src/app/models/underSection';

@Component({
  selector: 'app-undersection',
  templateUrl: './undersection.component.html',
  styleUrls: ['../../../pages.component.css']
})
export class UndersectionComponent implements OnInit {

  /** Liste des Sous Rubriques (NAME/SECTION/TYPE/INTAB)*/
  underSections: UnderSection[] = [];

  /** Colonnes à afficher dans le tableau des Sous-Rubriques */
  underSectionColumns: string[] = ['name', 'section', 'type', 'display', 'remove'];
  
  /** Liste des Rubriques mères */
  sections: Section[] =[];

  /** Enum Type*/
  enumTypeList = Object.values(EnumSectionType);

  /**
   * Constructeur vide
   */
  constructor() { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Sous-Rubriques
   */
  ngOnInit(): void {
    // Lit les Sous-Rubriques stocké en base
    this.underSections = TEST_UNDERSECTION;
    // Lit les Rubriques stocké en base
    this.sections = TEST_SECTION;
  }

  /**
   * Change la valeur de l'attribut "inTab"
   * 
   * @param undersection - UnderSection - Change la valeur de l'attribut "inTab"
   */
  displayInTab(undersection: UnderSection) {
    undersection.inTab = !undersection.inTab;
    this.modifyUnderSection(undersection);
  }

  /**
   * Lit dans la base les informations d'une Sous-Rubrique par rapport à son nom et sa Rubrique mère
   * 
   * @param name - string - Le nom de la Sous-Rubrique à lire
   * @param section - Section - La Rubrique mère 
   */
  readUnderSection(name: string, section: Section){
    
    //Appel du service
  }

  
  /**
   * Contrôle dans la base si une rubrique n'existe pas déjà avec le trio name/section/type
   * 
   * @param name - string - Le libellé de la rubrique à contrôler
   * @param type - string - Le type de la rubrique à contrôler
   */
     controlUnderSection(name: string, section: Section, type: string): void {

      //Appel du service
    }

  /**
   * Créer dans la base une rubrique avec la paire name/section/type
   * 
   * @param name - string - Le libellé de la rubrique à créer
   * @param section - Section - La Rubrique mère 
   * @param type - string - Le type de la rubrique à créer
   */
  createUnderSection(name: string, section: Section, type: string): void {

    //Appel du service
  }

  /**
   * Modifie un objet UnderSection en base
   * 
   * @param undersection - UnderSection - L'objet à modifier en base
   */
  modifyUnderSection(undersection: UnderSection) {

    //Appel du service
  }

  /**
   * Supprime la Sous-Rubrique correspondante à la ligne.
   * 
   * @param section - Section - La Sous-Rubrique à supprimer
   */
  removeUnderSection(undersection: UnderSection) {
    
    //Appel du service
  }

}
