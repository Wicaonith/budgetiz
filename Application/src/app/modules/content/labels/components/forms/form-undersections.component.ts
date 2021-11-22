import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Section } from 'src/app/shared/models/section.model';
import { Undersection } from 'src/app/shared/models/undersection.model';
import { SectionService } from 'src/app/shared/services/sections/section.service';
import { UndersectionService } from 'src/app/shared/services/undersections/undersection.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-form-undersections',
  templateUrl: './form-undersections.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class FormUndersectionsComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() undersection: Undersection = new Undersection("", 0, "", new Section("", 0, "", "", ""), true, "");
  /** Liste des Rubriques mères */
  sections: Array<Section> = new Array();
  // Tableau de Undersection "Tampon"
  undersections: Array<Undersection> = new Array();
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  /** 
   * Constructeur du composant SectionFormComponent
   */
  public constructor(
    private undersectionService: UndersectionService,
    private sectionService: SectionService,
    private utilsService: UtilsService,
    private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    //Appel du Service - Récupère toutes les Rubriques en base
    this.undersectionService.readUndersectionsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let undersection = data.data() as Undersection;
            undersection.id = data.id;
            this.undersections.push(undersection);
          },
          (err: any) => {
            this.handleError(`[Erreur] FormSectionsComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        this.readLastId(this.undersections);
      }
    );

    this.undersection.idUser = this.utilsService.getUserUID();

    //Appel du Service - Récupère toutes les Rubriques en base pour le Select (Combobox)
    this.sectionService.readSectionsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let section = data.data() as Section;
            section.id = data.id;
            this.sections.push(section);
          }
        );
      }
    )
  }


  /**
   * 
   * @param sections 
   */
  public readLastId(undersections: Undersection[]): void {

    let isInit: boolean = this.lastId === 0;

    // On parcourt toutes les Rubriques...
    for (let undersection of undersections) {
      // ... et si l'identifiant de la rubrique est supérieur à la variable lastId..
      if (undersection.idBase > this.lastId) {
        // ... on valorise lastId.
        this.lastId = undersection.idBase;
      }
    }
    if (isInit) {
      // Valorise lastId avec le prochain Identifiant à ajouter.
      this.lastId += 1;
    }
    // Initialisation des valeurs dans les champs inputs
    this.undersection.idBase = this.lastId;
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si il n'existe pas de rubrique avec cet ID...
    if (this.undersection.id === "") {
      // ... on le crée ...
      this.undersectionService.createUndersection(this.undersection);
    } else {
      // ... sinon on modifie l'existant.
      this.undersectionService.updateUndersection(this.undersection);
    }
    //Rechargement de la page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => {
        this.router.navigate(['budgetiz/labels/undersection']);
      }
    );
  }

  /**
   * Redirige vers l'url passé en paramètre
   * 
   * @param uri string - l'url de redirection
   */
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => {
        this.router.navigate([uri]);
      }
    );
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


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
