import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EnumCategoryType } from 'src/app/shared/enum/enumCategoryType';
import { Category } from 'src/app/shared/models/category.model';
import { Undercategory } from 'src/app/shared/models/undercategory.model';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { UndercategoryService } from 'src/app/shared/services/undercategories/undercategory.service';

@Component({
  selector: 'app-labels-undercategories',
  templateUrl: './labels-undercategories.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class LabelsUndercategoriesComponent implements OnInit {

  undercategory: Undercategory = new Undercategory("", 0, "", new Category("", 0, "", "", ""), true, "");

  /** Liste des Sous Catégoriess (ID/NAME/category/TYPE/INTAB)*/
  datasource: MatTableDataSource<Undercategory> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  // Tableau de Undercategory "Tampon"
  undercategories: Array<Undercategory> = new Array();
  // Tableau de Category "Tampon"
  categories: Array<Category> = new Array();

  /** Colonnes à afficher dans le tableau des Sous-Catégoriess */
  undercategoryColumns: Array<string> = ['idBase', 'name', 'category', 'display', 'edit', 'remove'];
  /** Enum Type*/
  enumTypeList = Object.values(EnumCategoryType);

  public constructor(private undercategoryService: UndercategoryService, private categoryService: CategoryService, private router: Router) { }

  /**
   * Appel a l'initialisation
   * Instancie le tableau des Sous-Catégoriess
   */
  public ngOnInit(): void {

    // Appel du Service - Récupère toutes les Sous-Catégoriess en base
    this.undercategoryService.readUndercategorysByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let undercategory = data.data() as Undercategory;
            undercategory.id = data.id;
            this.undercategories.push(undercategory);
          },
          (err: any) => {
            this.handleError(`[Erreur] LabelsUndercategoriesComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        // Appel du Service - Récupère toutes les Catégoriess en base
        this.categoryService.readCategoriesByUserId().get().then(
          (querySnapshot) => {
            querySnapshot.forEach(
              data => {
                let category = data.data() as Category;
                category.id = data.id;
                this.categories.push(category);
              }
            );
          }
        ).finally(
          () => {
            // On parcourt toutes les Sous-Catégoriess...
            for (let undercategory of this.undercategories) {

              // On parcourt toutes les Catégoriess...
              for (let category of this.categories) {

                if (undercategory.category.idBase === category.idBase) {

                  undercategory.category = category;
                }
              }
              undercategory.inTab = (Number(undercategory.inTab) === 1);
            }
          }
        );
        // On valorise les Catégoriess récupérées dans la dataSource de la Table 
        this.reloadTable();
      }
    );
  }


  reloadTable() {
    // Met à jour le tableau
    this.datasource.data = this.undercategories;
    if (this.sort) { // Vérifier qu'il y a bien un tri
      this.datasource.sort = this.sort;
    }
  }

  /**
   * Change la valeur de l'attribut "inTab"
   * 
   * @param Undercategory - Undercategory - Change la valeur de l'attribut "inTab"
   */
  public displayInTab(undercategory: Undercategory) {
    undercategory.inTab = !undercategory.inTab;
    this.undercategoryService.updateUndercategory(undercategory);
  }

  /**
   * Modifie un objet Undercategory en base
   * 
   * @param Undercategory - Undercategory - L'objet à modifier en base
   */
  public updateUndercategory(undercategory: Undercategory) {


    this.undercategory = { ...undercategory };
    this.undercategory.category = { ...undercategory.category };
  }

  /**
   * Supprime la Sous-Catégories correspondante à la ligne.
   * 
   * @param category - Category - La Sous-Catégories à supprimer
   */
  public deleteUndercategory(undercategory: Undercategory) {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Catégories.
      this.undercategoryService.deleteUndercategory(undercategory.id).then(() => this.redirectTo('budgetiz/labels/undercategory'));
    } else {
      alert("Une donnée utilise la Catégories. Veuillez la modifier");
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