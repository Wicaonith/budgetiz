import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/categories/category.service';

@Component({
  selector: 'app-labels-categories',
  templateUrl: './labels-categories.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class LabelsCategoriesComponent implements OnInit {

  /** Objet category du formulaire */
  category: Category = new Category("", 0, "", "", "");

  /** Colonnes à afficher dans le tableau des Catégoriess */
  categoryColumns: Array<string> = ['idBase', 'name', 'type', 'edit', 'remove'];

  /** Données du tableau : Liste des Catégoriess */
  datasource: MatTableDataSource<Category> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  // Tableau de category "Tampon"
  categories: Array<Category> = new Array();

  /**
   * Constructeur du composant CategoryComponent 
   * 
   * @param categoryService - CategoryService - Injection du service CategoryService
   */
  constructor(private router: Router, private categoryService: CategoryService) { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Catégoriess
   */
  public ngOnInit(): void {

    this.categoryService.readCategoriesByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let category = data.data() as Category;
            category.id = data.id;
            this.categories.push(category);
          },
          (err: any) => {
            this.handleError(`[Erreur] LabelsCategoriesComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        // On valorise les Catégoriess récupérées dans la dataSource de la Table 
        this.reloadTable();
      }
    );
  }

  reloadTable() {
    // Met à jour le tableau
    this.datasource.data = this.categories;
    if (this.sort) { // Vérifier qu'il y a bien un tri
      this.datasource.sort = this.sort;
    }
  }

  public updateCategory(category: Category): void {

    this.category = { ...category };
  }

  public deleteCategory(id: string): void {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Catégories.
      this.categoryService.deleteCategory(id).then(() => this.redirectTo('budgetiz/labels/category'));
    } else {
      alert("Une donnée utilise la Catégories. Veuillez la modifier");
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
