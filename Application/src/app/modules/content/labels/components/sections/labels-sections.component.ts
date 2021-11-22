import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Section } from 'src/app/shared/models/section.model';
import { SectionService } from 'src/app/shared/services/sections/section.service';

@Component({
  selector: 'app-labels-sections',
  templateUrl: './labels-sections.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class LabelsSectionsComponent implements OnInit {

  /** Objet section du formulaire */
  section: Section = new Section("", 0, "", "", "");

  /** Colonnes à afficher dans le tableau des Rubriques */
  sectionColumns: Array<string> = ['idBase', 'name', 'type', 'edit', 'remove'];

  /** Données du tableau : Liste des Rubriques */
  datasource: MatTableDataSource<Section> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  // Tableau de section "Tampon"
  sections: Array<Section> = new Array();

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

    this.sectionService.readSectionsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let section = data.data() as Section;
            section.id = data.id;
            this.sections.push(section);
          },
          (err: any) => {
            this.handleError(`[Erreur] LabelsSectionsComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        // On valorise les Rubriques récupérées dans la dataSource de la Table 
        this.reloadTable();
      }
    );
  }

  reloadTable() {
    // Met à jour le tableau
    this.datasource.data = this.sections;
    if (this.sort) { // Vérifier qu'il y a bien un tri
      this.datasource.sort = this.sort;
    }
  }

  public updateSection(section: Section): void {

    this.section = { ...section };
  }

  public deleteSection(id: string): void {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Rubrique.
      this.sectionService.deleteSection(id).then(() => this.redirectTo('budgetiz/labels/section'));
    } else {
      alert("Une donnée utilise la Rubrique. Veuillez la modifier");
    }
  }

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
