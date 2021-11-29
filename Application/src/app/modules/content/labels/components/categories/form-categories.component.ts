import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnumCategoryType } from 'src/app/shared/enum/enumCategoryType';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrls: ['../../../../../app.component.css']
})
/**
 * Classe Composant ForCategoriesComponent
 * 
 * @use Permet d'afficher le formulaire d'ajout et de modification des Catégoriess
 */
export class FormCategoriesComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() category: Category = new Category("", 0, "", "", "", false);

  /** Enum des Types de Catégoriess */
  enumTypeList = Object.values(EnumCategoryType);

  /** Prochain identifiant à ajouter pour l'utilisateur en cours */
  lastId: number = 0;

  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  // Tableau de category "Tampon"
  categories: Array<Category> = new Array();

  addCategory: boolean = true;

  /** 
   * Constructeur du composant FormCategoriesComponent
   */
  public constructor(
    private categoryService: CategoryService,
    private utilsService: UtilsService) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    //Appel du Service - Récupère toutes les Catégories en base
    this.categoryService.readCategoriesByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let category = data.data() as Category;
            category.id = data.id;
            this.categories.push(category);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] FormCategoriesComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        this.lastId = this.utilsService.readLastId(this.lastId, this.categories);
        this.category.idBase = this.lastId;
      }
    );
    this.category.idUser = this.utilsService.getUserUID();
  }


  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si il n'existe pas de catégories avec cet ID...
    if (this.category.id === "") {
      //... alors on le formatte ...
      this.category = this.formatCategoryName(this.category);
      // ... et on le crée ...
      this.categoryService.createCategory(this.category);
    } else {

      //... Sinon on le formatte ...
      if (this.category.name.startsWith('[')) {
        this.category.name = this.category.name.substr(3).trim();
      }
      this.category = this.formatCategoryName(this.category);

      // ... et on modifie l'existant.
      this.categoryService.updateCategory(this.category);
    }
    this.utilsService.redirectTo('budgetiz/labels/category');
  }

  /**
   * Formatte le nom de la Catégories sous la forme "[R] Salaire"
   * [1ere lettre du type] + Nom 
   * 
   * @param category - Category - La catégories a formatter
   * 
   * @returns Category - La Catégories avec le nom formatté
   */
  public formatCategoryName(category: Category): Category {

    category.name = "[" + category.type.substr(0, 1) + "] " + category.name;
    return category;
  }


  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
