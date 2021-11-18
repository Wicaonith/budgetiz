import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class SignUpComponent implements OnInit {


  @Input() login: Login = new Login("", "");

  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.emailSignup(this.login.email, this.login.password);
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
}
