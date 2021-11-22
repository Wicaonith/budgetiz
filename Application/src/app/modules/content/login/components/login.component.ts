import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';

export class Login {
  userEmail: string = "";
  userPassword: string = "";

  constructor(userEmail: string, userPassword: string) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class LoginComponent {

  @Input() login: Login = new Login("", "");
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);
  errorMsg: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  googleLogin() {
    alert("Pas encore implémenté");
    /*this.authService.signInWithGoogle();*/
  }

  onSubmit() {
    this.emailPasswordLogin();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => {
        this.router.navigate(['budgetiz/home']);
      }
    );

  }

  emailPasswordLogin() {
    if (this.login.userEmail && this.login.userPassword) {
      this.authService.signInWithEmail(this.login.userEmail, this.login.userPassword).then(
        (res: any) => {
          console.log('LoginComponent:: emailPasswordLogin:: successful login', res);
        }
      ).catch(
        (err: any) => {
          console.log('LoginComponent:: emailPasswordLogin:: login failed:', err);
          if (err.code === "auth/invalid-email") {
            this.manageError("L'adresse email n'est pas au bon format");
          }
          if (err.code === "auth/user-not-found") {
            this.manageError("L'utilisateur n'existe pas");
          }
        }
      );
    }
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

  manageError(message: string) {
    this.errorMsg = message;
  }

}
