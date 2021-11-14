import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-labels-tabs',
  templateUrl: './labels-tabs.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class LabelsTabsComponent implements OnInit {

  /** La tableau contenant les urls et les libellés des onglets */
  navLinks = [
    { path: '/budgetiz/labels/section', label: 'Rubrique' },
    { path: '/budgetiz/labels/undersection', label: 'Sous-Rubrique' },
    { path: '/budgetiz/labels/bankaccount', label: 'Compte' },
  ];
  /** Determine le lien actif */
  activeLink = this.navLinks[0].path;

  /**
   * Constructeur de la classe LabelsTabsComponent
   * 
   * @param router - Router - Contient les informations de route
   */
  constructor(private router: Router) { }

  /**
   * Méthode d'initialisation du composant
   */
  public ngOnInit(): void {

    // On parcours les onglets..
    for (let link of this.navLinks) {
      //.. et si le chemin est le même que l'url en cours...
      if (link.path === this.router.url) {
        // ... on active l'onglet correspondant
        this.activeLink = link.path;
      }
    }
  }
}
