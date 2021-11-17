import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section.model';
import { Undersection } from 'src/app/models/undersection.model';
import { SectionService } from 'src/app/services/section.service';
import { UndersectionService } from 'src/app/services/undersection.service';

@Component({
  selector: 'app-labels-undersections',
  templateUrl: './labels-undersections.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class LabelsUndersectionsComponent implements OnInit {

  undersection: Undersection = new Undersection("", "", new Section("", "", ""), true);
  /** Liste des Sous Rubriques (ID/NAME/SECTION/TYPE/INTAB)*/
  undersections: Array<Undersection> = new Array();
  /** Colonnes à afficher dans le tableau des Sous-Rubriques */
  undersectionColumns: Array<string> = ['id', 'name', 'section', 'display', 'edit', 'remove'];
  /** Enum Type*/
  enumTypeList = Object.values(EnumSectionType);
  /** Le dernier identifiant */
  lastId: number = 0;

  public constructor(private undersectionService: UndersectionService, private sectionService: SectionService, private router: Router) { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Sous-Rubriques
   */
  public ngOnInit(): void {
    // Appel du Service - Récupère toutes les Sous-Rubriques en base
    this.undersectionService.readUndersections().subscribe(

      (undersections: Undersection[]) => {

        this.undersections = undersections;

        // Appel du Service - Récupère toutes les Rubriques en base
        this.sectionService.readSections().subscribe(
          (sections: Section[]) => {

            // On parcourt toutes les Sous-Rubriques...
            for (let undersection of this.undersections) {

              // On parcourt toutes les Rubriques...
              for (let section of sections) {

                if (undersection.section.id === section.id) {

                  undersection.section = section;
                }
              }
              undersection.inTab = (Number(undersection.inTab) === 1);
            }
          }
        );
      }
    );
  }

  /**
   * Change la valeur de l'attribut "inTab"
   * 
   * @param Undersection - Undersection - Change la valeur de l'attribut "inTab"
   */
  public displayInTab(undersection: Undersection) {
    undersection.inTab = !undersection.inTab;
    this.undersectionService.updateUndersection(undersection).subscribe(() => this.redirectTo('budgetiz/labels/undersection'));
  }

  /**
   * Récupère dans la base les informations d'une Sous-Rubrique par rapport à son identifiant
   * 
   * @param id - number - L'identifiant de la Sous-Rubrique à lire
   */
  public readUndersection(id: string) {

    //Appel du service - Récupère une Sous-Rubrique par rapport à son identifiant.
    this.undersectionService.readUndersection(id);
  }

  /**
   * Modifie un objet Undersection en base
   * 
   * @param Undersection - Undersection - L'objet à modifier en base
   */
  public updateUndersection(undersection: Undersection) {

    //Appel du service - Modifie la Sous-Rubrique.
    this.undersection = new Undersection(undersection.id, undersection.name, undersection.section, undersection.inTab);
  }

  /**
   * Supprime la Sous-Rubrique correspondante à la ligne.
   * 
   * @param section - Section - La Sous-Rubrique à supprimer
   */
  public deleteUndersection(undersection: Undersection) {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Rubrique.
      this.undersectionService.deleteUndersection(undersection.id).subscribe(() => this.redirectTo('budgetiz/labels/undersection'));
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