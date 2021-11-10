import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['../../../pages.component.css']
})
export class SectionFormComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() section: Section = new Section(0, "", "");
  /** Enum des Types de Rubriques */
  enumTypeList = Object.values(EnumSectionType);
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);
  /** Liste des Rubriques (ID/NAME/TYPE)*/
  sections: Array<Section> = new Array();

  /** 
   * Constructeur du composant SectionFormComponent
   */
  public constructor(private router: Router, private sectionService: SectionService) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

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

    // Récupération de toutes les Rubriques
    this.sectionService.readSections().subscribe(sections => this.sections = sections);


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

    this.sectionService.readSection(this.section.id).subscribe(sect => controlSection = sect);
    alert(controlSection);
    if (controlSection === null) {
      console.log('create');
      this.sectionService.createSection(this.section).subscribe(() => this.refreshTable());
    } else {
      this.sectionService.updateSection(this.section).subscribe(() => this.refreshTable());
      console.log('update');
    }
  }

  public refreshTable(): void {
    let link = ['label/section']
    this.router.navigate(link);
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
