import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['../../../../pages.component.css']
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

  /** 
   * Constructeur du composant SectionFormComponent
   */
  public constructor(private router: Router, private sectionService: SectionService) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {
    this.lastId = this.sectionService.readLastId();
    this.section = new Section(this.lastId, "", "");
  }

  /** 
   * Redirige après l'enregistrement du formulaire
   */
  public onSubmit(): void {
    this.sectionService.createSection(this.section);
    console.log("Submit");
    let link = ['/label'];
    this.router.navigate(link);
  }

  /** 
   * Gère les erreurs si requis
   */
  public getErrorMessageRequired() : string{
    if (this.required.hasError('required')) {
      return 'Valeur obligatoire';
    }
    return '';
  }
}
