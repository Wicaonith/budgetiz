import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Section } from 'src/app/shared/models/section.model';
import { SectionService } from 'src/app/shared/services/section.service';

@Component({
  selector: 'app-labels-sections',
  templateUrl: './labels-sections.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class LabelsSectionsComponent implements OnInit, AfterViewInit {

  /** Objet section du formulaire */
  section: Section = new Section(0, "", "");
  /** Colonnes à afficher dans le tableau des Rubriques */
  sectionColumns: Array<string> = ['id', 'name', 'type', 'edit', 'remove'];

  /** Données du tableau : Liste des Rubriques (ID/NAME/TYPE)*/
  datasource = new MatTableDataSource<Section>();

  @ViewChild(MatSort) sort: MatSort = new MatSort;
  /**
   * Constructeur du composant SectionComponent 
   * 
   * @param sectionService - SectionService - Injection du service SectionService
   */
  constructor(private router: Router, private sectionService: SectionService) {

  }
  /**
   * Appel a l'initialisation
   * Instancie le tableau des Rubriques
   */
  public ngOnInit(): void {

  }


  public ngAfterViewInit(): void {
    //Appel du Service - Récupère toutes les Rubriques en base
    this.sectionService.readSections().subscribe((sections: Section[]) => {
      // Met à jour le tableau
      this.datasource = new MatTableDataSource(sections);
      if (this.sort) { // Vérifier qu'il y a bien un tri
        this.datasource.sort = this.sort;
      }

    },
      (err: any) => {
        this.handleError(`[Erreur] FormSectionsComponent - ngOnInit()`, err);
      },
      () => {
        // onComplete
        // Nothing
      });
  }

  /**
   * Modifie la Rubrique correspondante a celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à modifier
   */
  public updateSection(section: Section): void {

    this.section = { ...section };
  }

  /**
   * Supprime la Rubrique correspondante à la ligne
   * 
   * @param section - Section - La section à supprimer
   */
  public deleteSection(id: number): void {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Rubrique.
      this.sectionService.deleteSection(id).then(() => this.redirectTo('budgetiz/labels/section'));
    } else {
      alert("Une donnée utilise la Rubrique. Veuillez la modifier");
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
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

  /**
 * Gestion des erreurs
 * 
 * @param operation 
 * @param result 
 * 
 * @returns 
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
