import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  public logInOrLogOut() {
    if (!this.isLoggedIn) {
      this.login();
    } else {
      this.logout();
    }
  }

  public login(): void {
    this.isLoggedIn = true;
  }

  public logout(): void {
    this.isLoggedIn = false;
  }

  //ACCESSEUR
  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
