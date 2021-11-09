import { Component, OnInit } from '@angular/core';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';
import { Undersection } from 'src/app/models/undersection';
import { SectionService } from 'src/app/services/section.service';
import { UndersectionService } from 'src/app/services/undersection.service';

@Component({
  selector: 'app-undersection',
  templateUrl: './undersection.component.html',
  styleUrls: ['../../../pages.component.css']
})
export class UndersectionComponent implements OnInit {

  /** Liste des Sous Rubriques (ID/NAME/SECTION/TYPE/INTAB)*/
  undersections: Undersection[] = [];
  /** Colonnes à afficher dans le tableau des Sous-Rubriques */
  undersectionColumns: string[] = ['id', 'name', 'section', 'type', 'display', 'remove'];
  /** Liste des Rubriques mères */
  sections: Section[] = [];
  /** Enum Type*/
  enumTypeList = Object.values(EnumSectionType);
  /** Le dernier identifiant */
  lastId: number = 0;

  public constructor(private undersectionService: UndersectionService, private sectionService: SectionService) { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Sous-Rubriques
   */
  public ngOnInit(): void {
    // Lit les Sous-Rubriques stocké en base
    this.undersections = this.undersectionService.readUndersections();
    // Lit les Rubriques stocké en base
    this.sections = this.sectionService.readSections();
    //Initialise le dernier identifiant
    this.lastId = this.undersectionService.readLastId();
  }

  /**
   * Change la valeur de l'attribut "inTab"
   * 
   * @param Undersection - Undersection - Change la valeur de l'attribut "inTab"
   */
  public displayInTab(Undersection: Undersection) {
    Undersection.inTab = !Undersection.inTab;
    this.updateUndersection(Undersection);
  }


  /**
   * Créer dans la base une rubrique avec la paire name/section/type
   * 
   * @param name - string - Le libellé de la rubrique à créer
   * @param section - Section - La Rubrique mère 
   * @param type - string - Le type de la rubrique à créer
   */
  public createUndersection(name: string, section: Section, type: string): void {

    //Appel du service
  }

  /**
   * Récupère dans la base les informations d'une Sous-Rubrique par rapport à son identifiant
   * 
   * @param id - number - L'identifiant de la Sous-Rubrique à lire
   */
  public readUndersection(id: string) {

    let idN: number = Number(id);

    //Appel du service - Récupère une Sous-Rubrique par rapport à son identifiant.
    this.undersectionService.readUndersection(idN);
  }

  /**
   * Modifie un objet Undersection en base
   * 
   * @param Undersection - Undersection - L'objet à modifier en base
   */
  public updateUndersection(Undersection: Undersection) {


    //Appel du service - Modifie la Sous-Rubrique.
    this.undersectionService.updateUndersection(Undersection);
  }

  /**
   * Supprime la Sous-Rubrique correspondante à la ligne.
   * 
   * @param section - Section - La Sous-Rubrique à supprimer
   */
  public deleteUndersection(Undersection: Undersection) {

    //Appel du service
  }

  /**
   * Contrôle dans la base si une rubrique n'existe pas déjà avec le trio name/section/type
   * 
   * @param name - string - Le libellé de la rubrique à contrôler
   * @param type - string - Le type de la rubrique à contrôler
   */
  public controlUndersection(name: string, section: Section, type: string): void {

    //Appel du service
  }
}
