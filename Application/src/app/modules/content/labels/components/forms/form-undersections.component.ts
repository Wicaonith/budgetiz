import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Section } from 'src/app/models/section.model';
import { Undersection } from 'src/app/models/undersection';
import { SectionService } from 'src/app/services/section.service';
import { UndersectionService } from 'src/app/services/undersection.service';

@Component({
  selector: 'app-form-undersections',
  templateUrl: './form-undersections.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class FormUndersectionsComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() undersection: Undersection = new Undersection(0, "", new Section("", "", ""), true);
  /** Liste des Rubriques mères */
  sections: Array<Section> = new Array();
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  /** 
   * Constructeur du composant SectionFormComponent
   */
  public constructor(private undersectionService: UndersectionService, private sectionService: SectionService, private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    //Appel du Service - Récupère toutes les Rubriques en base
    this.undersectionService.readUndersections().subscribe(
      //Récupère dans la base l'identifiant de la derniere Rubrique créé
      (undersections: Undersection[]) => {

        // On parcourt toutes les Rubriques...
        for (let undersection of undersections) {
          // ... et si l'identifiant de la rubrique est supérieur à la variable lastId..
          if (undersection.id > this.lastId) {
            // ... on valorise lastId.
            this.lastId = undersection.id;
          }
        }
        // Retourne le dernier ID + 1 
        this.lastId += 1;

        // Initialisation des valeurs dans les champs inputs
        this.undersection = new Undersection(this.lastId, "", new Section("", "", ""), true);
      });

    //Appel du Service - Récupère toutes les Rubriques en base
    this.sectionService.readSections().subscribe((sections: Section[]) => this.sections = sections);
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si on récupère une Rubrique via l'ID, alors c'est qu'il existe, donc on appel la méthode "update" sinon "create"
    this.undersectionService.readUndersection(this.undersection.id).subscribe(
      (undersect: Undersection) => {

        // Si il n'existe pas de rubrique avec cet ID...
        if (undersect === undefined) {
          // ... Alors on le crée ...
          this.undersectionService.createUndersection(this.undersection).subscribe(() => this.redirectTo('budgetiz/labels/undersection'));
        } else {
          // ... Sinon on modifie l'existant.
          this.undersectionService.updateUndersection(this.undersection).subscribe(() => this.redirectTo('budgetiz/labels/undersection'));
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
