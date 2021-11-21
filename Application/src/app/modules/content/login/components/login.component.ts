import { Component, Input } from '@angular/core';
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
  emailEnabled: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {

  }

  googleLogin() {
    alert("Pas encore implémenté");
    /*this.authService.signInWithGoogle().then(res => {
      console.log('LoginComponent:: successful login');
    });*/
  }

  onSubmit() {
    this.emailPasswordLogin();
    const user = this.authService.isLoggedIn()
    if (user) {
      console.log("CONNECTÉ OMG");
    }
    this.router.navigate(['budgetiz/home']);
  }

  emailPasswordLogin() {
    if (this.login.userEmail && this.login.userPassword) {
      this.authService.signInWithEmail(this.login.userEmail, this.login.userPassword).then((res: any) => {
        console.log('LoginComponent:: emailPasswordLogin:: successful login', res);
      }).catch((err: any) => {
        console.log('LoginComponent:: emailPasswordLogin:: login failed:', err);
      });
    }
  }

  emailPasswordSignUp() {
    if (this.login.userEmail && this.login.userPassword) {
      this.authService.signUpWithEmail(this.login.userEmail, this.login.userPassword).then((res: any) => {
        console.log('LoginComponent:: successful login', res);
      }).catch((err: any) => {
        console.log('LoginComponent:: emailPasswordSignUp:: sign up failed:', err);
      });
    }
  }
}
