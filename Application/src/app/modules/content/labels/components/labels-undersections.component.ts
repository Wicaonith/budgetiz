import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EnumSectionType } from 'src/app/shared/enum/enumSectionType';
import { Section } from 'src/app/shared/models/section.model';
import { Undersection } from 'src/app/shared/models/undersection.model';
import { SectionService } from 'src/app/shared/services/sections/section.service';
import { UndersectionService } from 'src/app/shared/services/undersections/undersection.service';

@Component({
  selector: 'app-labels-undersections',
  templateUrl: './labels-undersections.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class LabelsUndersectionsComponent implements OnInit {

  undersection: Undersection = new Undersection("", 0, "", new Section("", 0, "", "", ""), true, "");

  /** Liste des Sous Rubriques (ID/NAME/SECTION/TYPE/INTAB)*/
  datasource: MatTableDataSource<Undersection> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  // Tableau de Undersection "Tampon"
  undersections: Array<Undersection> = new Array();
  // Tableau de Section "Tampon"
  sections: Array<Section> = new Array();

  /** Colonnes à afficher dans le tableau des Sous-Rubriques */
  undersectionColumns: Array<string> = ['idBase', 'name', 'section', 'display', 'edit', 'remove'];
  /** Enum Type*/
  enumTypeList = Object.values(EnumSectionType);

  public constructor(private undersectionService: UndersectionService, private sectionService: SectionService, private router: Router) { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Sous-Rubriques
   */
  public ngOnInit(): void {

    // Appel du Service - Récupère toutes les Sous-Rubriques en base
    this.undersectionService.readUndersectionsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let undersection = data.data() as Undersection;
            undersection.id = data.id;
            this.undersections.push(undersection);
          },
          (err: any) => {
            this.handleError(`[Erreur] LabelsUndersectionsComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        // Appel du Service - Récupère toutes les Rubriques en base
        this.sectionService.readSectionsByUserId().get().then(
          (querySnapshot) => {
            querySnapshot.forEach(
              data => {
                let section = data.data() as Section;
                section.id = data.id;
                this.sections.push(section);
              }
            );
          }
        ).finally(
          () => {
            // On parcourt toutes les Sous-Rubriques...
            for (let undersection of this.undersections) {

              // On parcourt toutes les Rubriques...
              for (let section of this.sections) {

                if (undersection.section.idBase === section.idBase) {

                  undersection.section = section;
                }
              }
              undersection.inTab = (Number(undersection.inTab) === 1);
            }
          }
        );
        // On valorise les Rubriques récupérées dans la dataSource de la Table 
        this.reloadTable();
      }
    );
  }


  reloadTable() {
    // Met à jour le tableau
    this.datasource.data = this.undersections;
    if (this.sort) { // Vérifier qu'il y a bien un tri
      this.datasource.sort = this.sort;
    }
  }

  /**
   * Change la valeur de l'attribut "inTab"
   * 
   * @param Undersection - Undersection - Change la valeur de l'attribut "inTab"
   */
  public displayInTab(undersection: Undersection) {
    undersection.inTab = !undersection.inTab;
    this.undersectionService.updateUndersection(undersection);
  }

  /**
   * Modifie un objet Undersection en base
   * 
   * @param Undersection - Undersection - L'objet à modifier en base
   */
  public updateUndersection(undersection: Undersection) {


    this.undersection = { ...undersection };
    this.undersection.section = { ...undersection.section };
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
      this.undersectionService.deleteUndersection(undersection.id).then(() => this.redirectTo('budgetiz/labels/undersection'));
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}