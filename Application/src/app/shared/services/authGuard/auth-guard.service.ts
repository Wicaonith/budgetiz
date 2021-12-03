import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { UtilsService } from '../utils/utils.service';

@Injectable()
/**
 * Class Guard de gestion de l'accès au page en fonction de l'authentification utilisateur où non.
 *
 * @implements CanActivate
 */
export class AuthGuard implements CanActivate {

    /**
     * Constructeur de la class AuthGuard
     *
     * @param {AuthService} authService - Classe Service AuthService
     * @param {UtilsService} utilsService - Classe Service UtilsService
     * @param {} router - Classe gérant le routing
     */
    constructor(
      private authService: AuthService,
      private utilsService: UtilsService,
      private router: Router) { }

    /**
     * Guardien qui vérifie si un utilisateur est authentifié avant d'afficher une page.
     *
     * @returns {Promise<boolean>} - Retour
     */
    public async canActivate(): Promise<boolean> {
        // Vérifie si un utilisateur est authentifié
        const user = await this.authService.isLoggedIn()
        if (user) {
            // Si oui, accès a la page
            return true;
        } else {
            //Si non, redirection vers la page d'authentification
            this.utilsService.redirectTo('budgetiz/login');
            return false;
        }
    }
}
