import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-form-sections',
  templateUrl: './form-sections.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class FormSectionsComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() section: Section = new Section("", "", "");
  /** Enum des Types de Rubriques */
  enumTypeList = Object.values(EnumSectionType);
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  /** 
   * Constructeur du composant FormSectionsComponent
   */
  public constructor(private sectionService: SectionService, private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    //Appel du Service - Récupère toutes les Rubriques en base
    this.sectionService.readSections().subscribe(
      (sections: Section[]) => {

        let isInit: boolean = this.lastId === 0;
        for (let section of sections) {
          // ... et si l'identifiant de la rubrique est supérieur à la variable lastId..
          if (Number(section.id) > this.lastId) {
            // ... on valorise lastId.
            this.lastId = Number(section.id);
          }
        }
        if (isInit) {
          // Valorise lastId avec le prochain Identifiant à ajouter.
          this.lastId += 1;
        }

        // Initialisation des valeurs dans les champs inputs
        this.section.id = this.lastId.toString();
      },
      (err: any) => {
        this.handleError(`[Erreur] FormSectionsComponent - ngOnInit()`, err);
      },
      () => {
        // onComplete
        // Nothing
      }
    );
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si on récupère une Rubrique via l'ID, alors c'est qu'elle existe, donc on appelle la méthode "update" sinon "create"
    this.sectionService.readSection(this.section.id).subscribe(
      (sect: Section) => {
        console.log(sect);
        // Si il n'existe pas de rubrique avec cet ID...
        if (sect === undefined) {
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
      },
      (err: any) => {
        this.handleError(`[Erreur] FormSectionsComponent - onSubmit()`, err);
      },
      () => {
        // onComplete
        // On recharge la page
        this.redirectTo('budgetiz/labels/section');
      }
    );
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
