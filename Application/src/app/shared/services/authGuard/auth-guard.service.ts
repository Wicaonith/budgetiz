import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../authentication/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    public async canActivate(): Promise<boolean> {
        const user = await this.authService.isLoggedIn()
        if (user) {
            return true;
        } else {
            this.router.navigate(['budgetiz/login']);
            return false;
        }
    }
}
