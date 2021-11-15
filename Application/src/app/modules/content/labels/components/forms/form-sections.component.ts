import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-form-sections',
  templateUrl: './form-sections.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class FormSectionsComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() section: Section = new Section(0, "", "");
  /** Enum des Types de Rubriques */
  enumTypeList = Object.values(EnumSectionType);
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  /** 
   * Constructeur du composant SectionFormComponent
   */
  public constructor(private sectionService: SectionService, private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    //Appel du Service - Récupère toutes les Rubriques en base
    this.sectionService.readSections().subscribe(
      //Récupère dans la base l'identifiant de la derniere Rubrique créé
      (sections: Section[]) => {

        // On parcourt toutes les Rubriques...
        for (let section of sections) {
          // ... et si l'identifiant de la rubrique est supérieur à la variable lastId..
          if (section.id > this.lastId) {
            // ... on valorise lastId.
            this.lastId = section.id;
          }
        }
        // Retourne le dernier ID + 1 
        this.lastId += 1;

        // Initialisation des valeurs dans les champs inputs
        this.section = new Section(this.lastId, "", "");
      });
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si on récupère une Rubrique via l'ID, alors c'est qu'il existe, donc on appel la méthode "update" sinon "create"
    this.sectionService.readSection(this.section.id).subscribe(
      (sect: Section) => {

        // Si il n'existe pas de rubrique avec cet ID...
        if (sect === undefined) {
          // ... Alors on le crée ...
          this.sectionService.createSection(this.section).subscribe(() => this.redirectTo('budgetiz/labels/section'));
        } else {
          // ... Sinon on modifie l'existant.
          this.sectionService.updateSection(this.section).subscribe(() => this.redirectTo('budgetiz/labels/section'));
          console.log('update');
        }
      }
    )
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
   * Gère les erreurs si requis
   */
  public getErrorMessageRequired(): string {
    if (this.required.hasError('required')) {
      return 'Valeur obligatoire';
    }
    return '';
  }
}
