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
/**
 * Classe Composant FormSectionsComponent
 * 
 * @use Permet d'afficher le formulaire d'ajout et de modification des Rubriques
 */
export class FormSectionsComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() section: Section = new Section(0, "", "");

  /** Enum des Types de Rubriques */
  enumTypeList = Object.values(EnumSectionType);

  /** Dernier identifiant */
  lastId: number = 0;

  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);
  /** Permet de savoir si la Rubrique soumise par le formulaire est à créer ou modifier */
  isModif: boolean = false;

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
      (sections: Section[]) => { // onNext

        this.readLastId(sections);
      },
      (err: any) => { // onError
        this.handleError(`[Erreur] FormSectionsComponent - ngOnInit()`, err);
      }
    );
  }
  public readLastId(sections: Section[]): void {

    let isInit: boolean = this.lastId === 0;
    for (let section of sections) {
      // ... et si l'identifiant de la rubrique est supérieur à la variable lastId..
      if (section.id > this.lastId) {
        // ... on valorise lastId.
        this.lastId = section.id;
      }
    }
    if (isInit) {
      // Valorise lastId avec le prochain Identifiant à ajouter.
      this.lastId += 1;
    }

    // Initialisation des valeurs dans les champs inputs
    this.section.id = this.lastId;
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si on récupère une Rubrique via l'ID, alors c'est qu'elle existe, donc on appelle la méthode "update" sinon "create"
    this.sectionService.readSection(this.section.id).subscribe(
      (sect: Section) => { // onNext
        this.isModif = sect === undefined
      },
      (err: any) => { // onError
        this.handleError(`[Erreur] FormSectionsComponent - ngOnInit()`, err);
      }
    );

    // Si il n'existe pas de rubrique avec cet ID...
    if (!this.isModif) {
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
  redirectTo(uri: string): void {
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
