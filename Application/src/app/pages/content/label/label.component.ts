import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['../../pages.component.css']
})
export class LabelComponent implements OnInit {
  navLinks = [
    { path: '/budgetiz/label/section', label: 'Rubrique' },
    { path: '/budgetiz/label/undersection', label: 'Sous-Rubrique' },
    { path: '/budgetiz/label/account', label: 'Compte' },
  ];

  links = ['/budgetiz/label/section', '/budgetiz/label/undersection', '/budgetiz/label/account'];
  titles = ['Rubrique', 'Sous-Rubrique', 'Compte'];
  activeLink = this.navLinks[0].path;

  constructor() { }

  ngOnInit(): void {
    
  }
}
