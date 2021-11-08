import { Component, OnInit, SimpleChanges } from '@angular/core';
import { LoginService } from "../../services/login.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../pages.component.css']
})
export class HeaderComponent implements OnInit {

  private menus: Map<string,string>;

  /**
   * Constructeur de la classe HeaderComponent
   * 
   * @param loginService - LoginService
   */
  public constructor(private loginService: LoginService) { 

    this.menus = new Map<string, string>();
    this.menus.set("Accueil", "");
    this.menus.set("Prévisionnel", "/previsionnal");
    this.menus.set("Épargne", "/saving");
    this.menus.set("Label", "/label");
    this.menus.set("Données", "/data");
  }

  /**
   * Méthode au clic sur le bouton de connexion/déconnexion
   */
  public logInOrLogOut(): void {
    this.loginService.logInOrLogOut();
  }

  /**
   * Méthode d'implémentation de OnInit
   */
  public ngOnInit(): void {
    console.log("[HeaderComponent] - OnInit")
  }

  /**
   * Méthode d'implémentation de OnChanges
   * @param changes - SimpleChanges
   */
  public ngOnChanges(changes: SimpleChanges): void {
    console.log("[HeaderComponent] - Onchanges", changes);
  }

  /**
   * Méthode d'implémentation de AfterViewInit
   */
  public ngAfterViewInit(): void {
    console.log("[HeaderComponent] - AfterViewInit");
  }

  //ACCESSEUR
  public getMenus(): Map<string, string> {return this.menus;}
  public getLoginService(): LoginService {return this.loginService;}
}
