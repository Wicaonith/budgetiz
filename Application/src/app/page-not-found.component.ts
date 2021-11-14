import { Component } from '@angular/core';

@Component({
  selector: 'page-404',
  template: `
    <div class='page-not-found'>
      <p>Hey, cette page n'existe pas !</p>
      <br />
      <a routerLink="/budgetiz/home">
        Retourner à l' accueil
      </a>
    </div>
  `,
  styleUrls: ['/app.component.css']
})
export class PageNotFoundComponent { }
