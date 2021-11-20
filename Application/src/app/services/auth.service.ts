import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    redirectUrl! : string;

    public login(login:string, password:string): Observable<boolean> {

        let isLoggedIn = true;//(login === 'admin' && password === 'admin');

        return of(true).pipe(delay(1000)).pipe(tap(() => this.isLoggedIn = isLoggedIn));
    }

    public logout() : void {
        this.isLoggedIn = false;
    }
}