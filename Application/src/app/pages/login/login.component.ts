import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../pages.component.css']
})
export class LoginComponent implements OnInit{

  protected message: string = 'Vous n\'êtes pas connecté';
  public login!:string;
  public password!:string;
  public isLoggedIn : boolean = false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  public setMessage(): void{
    this.message = this.authService.isLoggedIn ? 'Vous êtes donnecté' : 'Identifiant ou mot de passe incorrect.';
  }

  public logIn(): void{
    this.message = 'Tentative de connexion...';
    this.authService.login(this.login, this.password).subscribe(() => {
      this.setMessage();
      if(this.authService.isLoggedIn) {
        // Récupère l'URL de redirection depuis le service d'authentification
        // Si aucune redirection n'a été définis, redirige l'utilisateur vers la page d'accueil
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/budgetiz/home';
        // Redirige l'utilisateur
        this.router.navigate([redirect]);
        this.isLoggedIn = this.authService.isLoggedIn;
      } else {
        this.password = '';
      }
    });
  }

  // Déconnecte l'utilisateur
  public logOut():void {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.setMessage();
}
}
