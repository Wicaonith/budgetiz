import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { Undercategory } from 'src/app/shared/models/undercategory.model';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { UndersectionService } from 'src/app/shared/services/undercategories/undercategory.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-form-undercategories',
  templateUrl: './form-undercategories.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class FormUndercategoriesComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() undercategory: Undercategory = new Undercategory("", 0, "", new Category("", 0, "", "", ""), true, "");
  /** Liste des Catégoriess mères */
  categories: Array<Category> = new Array();
  // Tableau de Undercategory "Tampon"
  undercategories: Array<Undercategory> = new Array();
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  /** 
   * Constructeur du composant CategoryFormComponent
   */
  public constructor(
    private undercategoryService: UndersectionService,
    private sectionService: CategoryService,
    private utilsService: UtilsService,
    private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    //Appel du Service - Récupère toutes les Catégoriess en base
    this.undercategoryService.readUndersectionsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let undercategory = data.data() as Undercategory;
            undercategory.id = data.id;
            this.undercategories.push(undercategory);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] FormCategoriesComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        this.readLastId(this.undercategories);
      }
    );

    this.undercategory.idUser = this.utilsService.getUserUID();

    //Appel du Service - Récupère toutes les Catégoriess en base pour le Select (Combobox)
    this.sectionService.readCategoriesByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let category = data.data() as Category;
            category.id = data.id;
            this.categories.push(category);
          }
        );
      }
    )
  }


  /**
   * 
   * @param categories 
   */
  public readLastId(undercategories: Undercategory[]): void {

    let isInit: boolean = this.lastId === 0;

    // On parcourt toutes les Catégoriess...
    for (let undercategory of undercategories) {
      // ... et si l'identifiant de la catégories est supérieur à la variable lastId..
      if (undercategory.idBase > this.lastId) {
        // ... on valorise lastId.
        this.lastId = undercategory.idBase;
      }
    }
    if (isInit) {
      // Valorise lastId avec le prochain Identifiant à ajouter.
      this.lastId += 1;
    }
    // Initialisation des valeurs dans les champs inputs
    this.undercategory.idBase = this.lastId;
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si il n'existe pas de catégories avec cet ID...
    if (this.undercategory.id === "") {
      // ... on le crée ...
      this.undercategoryService.createUndersection(this.undercategory);
    } else {
      // ... sinon on modifie l'existant.
      this.undercategoryService.updateUndersection(this.undercategory);
    }
    //Rechargement de la page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => {
        this.router.navigate(['budgetiz/labels/undercategory']);
      }
    );
  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
