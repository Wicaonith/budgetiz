import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

export class ResetPassword {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class ResetPwdComponent implements OnInit {

  @Input() resetPwdEmail: ResetPassword = new ResetPassword("");

  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  errorMsg: string = "";
  hintMsg: string = "";

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.sendPasswordResetEmail(this.resetPwdEmail.email).then(
      () => {
        this.utilsService.openSnackBar("Email envoyé à " + this.resetPwdEmail.email, "OK");
        delay(2000);
        console.log("Réinitialisation du mot de passe via l'email " + this.resetPwdEmail.email);
      }
    )
  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
