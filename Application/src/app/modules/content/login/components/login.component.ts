import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService) { }

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
          if (err.code === "auth/invalid-email") {
            this.utilsService.openSnackBar("L'adresse email n'est pas au bon format.", "OK");
          }
          if (err.code === "auth/user-not-found") {
            this.utilsService.openSnackBar("Il n'y a aucun utilisateur en lien avec cette adresse mail.", "OK");
          }
        }
      );
    }
  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
