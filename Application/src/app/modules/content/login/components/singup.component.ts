import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

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

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService) { }

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
            this.utilsService.openSnackBar("Un compte existe déjà pour cette adresse email.", "OK");
          }
          if (err.code === "auth/weak-password") {
            this.utilsService.openSnackBar("Le mot de passe doit contenir au moins 6 caractères", "OK");
          }
        }
      );
    }
  }

  controlPassword() {
    if (this.signUp.userPassword !== this.signUp.userConfirmedPassword) {
      this.utilsService.openSnackBar("Les mots de passe sont différents.", "OK");
      return false;
    }
    return true;

  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
