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
  lastId!: number;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  sections: Array<Section> = new Array();

  /** 
   * Constructeur du composant SectionFormComponent
   */
  public constructor(private sectionService: SectionService, private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {
    //Appel du Service - Récupère toutes les Rubriques en base
    this.sectionService.readSections().subscribe(sections => this.sections = sections);

    this.lastId = this.readLastId();
    this.section = new Section(this.lastId, "", "");
  }

  /**
   * Récupère dans la base l'identifiant de la derniere Rubrique créé
   * 
   * @returns number - L'identifiant le plus grand
   */
  public readLastId(): number {

    // Variable de retour
    let lastId = 0;

    // On parcourt toutes les Rubriques...
    for (let section of this.sections) {
      // ... et s
      if (section.id > lastId) {
        lastId = section.id;
      }
    }
    // Retourne le dernier ID + 1 
    return lastId + 1;
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    let controlSection!: Section;

    // Si on récupère une Rubrique via l'ID, alors c'est qu'il existe, donc on appel la méthode "update" sinon "create"
    this.sectionService.readSection(this.section.id).subscribe(sect => controlSection = sect);

    if (controlSection === null) {
      console.log('create');
      this.sectionService.createSection(this.section).subscribe(() => this.redirectTo('label/section'));
    } else {
      this.sectionService.updateSection(this.section).subscribe(() => this.redirectTo('label/section'));
      console.log('update');
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
