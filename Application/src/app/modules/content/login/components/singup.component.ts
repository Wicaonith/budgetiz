import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';

export class SignUp {
  userEmail: string = "";
  userPassword: string = "";
  userConfirmedPassword: string = "";

  constructor(userEmail: string, userPassword: string, userConfirmedPassword: string) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userConfirmedPassword = userConfirmedPassword;
  }
}

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class SingupComponent implements OnInit {

  @Input() signUp: SignUp = new SignUp("", "", "");
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);
  errorMsg: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.controlPassword()) {
      this.authService.signUpWithEmail(this.signUp.userEmail, this.signUp.userPassword).then(
        (res: any) => {
          console.log('LoginComponent:: successful login', res);
        }
      ).catch(
        (err: any) => {
          console.log('LoginComponent:: emailPasswordSignUp:: sign up failed:', err);
          if (err.code === "auth/email-already-in-use") {
            this.manageError("Un compte existe déjà pour cette adresse email.");
          }
          if (err.code === "auth/weak-password") {
            this.manageError("Le mot de passe doit contenir au moins 6 caractères");
          }
        }
      );
    }
  }

  controlPassword() {
    if (this.signUp.userPassword !== this.signUp.userConfirmedPassword) {
      this.manageError("Les mots de passe sont différents.")
      return false;
    }
    return true;

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
