import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-labels-sections',
  templateUrl: './labels-sections.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class LabelsSectionsComponent implements OnInit {

  /** Objet section du formulaire */
  section: Section = new Section(0, "", "");
  /** Liste des Rubriques (ID/NAME/TYPE)*/
  sections: Array<Section> = new Array();
  /** Colonnes à afficher dans le tableau des Rubriques */
  sectionColumns: Array<string> = ['id', 'name', 'type', 'edit', 'remove'];
  /** Enum Type*/
  enumTypeList = Object.values(EnumSectionType);

  /**
   * Constructeur du composant SectionComponent 
   * 
   * @param sectionService - SectionService - Injection du service SectionService
   */
  constructor(private router: Router, private sectionService: SectionService) { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Rubriques
   */
  public ngOnInit(): void {
    //Appel du Service - Récupère toutes les Rubriques en base
    this.sectionService.readSections().subscribe(sections => this.sections = sections);
  }

  /**
   * Modifie la Rubrique correspondante a celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à modifier
   */
  public updateSection(section: Section): void {

    this.section = new Section(section.id, section.name, section.type);
  }

  /**
   * Supprime la Rubrique correspondante à la ligne
   * 
   * @param section - Section - La section à supprimer
   */
  public deleteSection(section: Section): void {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Rubrique.
      this.sectionService.deleteSection(section).subscribe(_ => this.redirectTo('budgetiz/labels/section'));
    } else {
      alert("Une donnée utilise la Rubrique. Veuillez la modifier");
    }
  }

  /**
   * Redirige vers l'url passé en paramètre
   * 
   * @param uri string - l'url de redirection
   */
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
