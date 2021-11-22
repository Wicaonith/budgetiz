import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EnumSectionType } from 'src/app/shared/enum/enumSectionType';
import { Section } from 'src/app/shared/models/section.model';
import { SectionService } from 'src/app/shared/services/sections/section.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-form-sections',
  templateUrl: './form-sections.component.html',
  styleUrls: ['../../../../../app.component.css']
})
/**
 * Classe Composant FormSectionsComponent
 * 
 * @use Permet d'afficher le formulaire d'ajout et de modification des Rubriques
 */
export class FormSectionsComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() section: Section = new Section("", 0, "", "", "");

  /** Enum des Types de Rubriques */
  enumTypeList = Object.values(EnumSectionType);

  /** Prochain identifiant à ajouter pour l'utilisateur en cours */
  lastId: number = 0;

  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  // Tableau de section "Tampon"
  sections: Array<Section> = new Array();

  /** 
   * Constructeur du composant FormSectionsComponent
   */
  public constructor(
    private sectionService: SectionService,
    private utilsService: UtilsService,
    private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    //Appel du Service - Récupère toutes les Rubriques en base
    this.sectionService.readSectionsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let section = data.data() as Section;
            section.id = data.id;
            this.sections.push(section);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] FormSectionsComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        this.readLastId(this.sections);
      }
    );
    this.section.idUser = this.utilsService.getUserUID();
  }


  /**
   * 
   */
  public readLastId(sections: Section[]): void {

    let isInit: boolean = this.lastId === 0;
    for (let section of sections) {
      // ... et si l'identifiant de la rubrique est supérieur à la variable lastId..
      if (section.idBase > this.lastId) {
        // ... on valorise lastId.
        this.lastId = section.idBase;
      }
    }
    if (isInit) {
      // Valorise lastId avec le prochain Identifiant à ajouter.
      this.lastId += 1;
    }

    // Initialisation des valeurs dans les champs inputs
    this.section.idBase = this.lastId;
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si il n'existe pas de rubrique avec cet ID...
    if (this.section.id === "") {
      //... alors on le formatte ...
      this.section = this.formatSectionName(this.section);
      // ... et on le crée ...
      this.sectionService.createSection(this.section);
    } else {

      //... Sinon on le formatte ...
      if (this.section.name.startsWith('[')) {
        this.section.name = this.section.name.substr(3).trim();
      }
      this.section = this.formatSectionName(this.section);

      // ... et on modifie l'existant.
      this.sectionService.updateSection(this.section);
    }
    this.utilsService.redirectTo('budgetiz/labels/section');
  }


  /**
   * Formatte le nom de la Rubrique sous la forme "[R] Salaire"
   * [1ere lettre du type] + Nom 
   * 
   * @param section - Section - La rubrique a formatter
   * 
   * @returns Section - La Rubrique avec le nom formatté
   */
  public formatSectionName(section: Section): Section {

    section.name = "[" + section.type.substr(0, 1) + "] " + section.name;
    return section;
  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
