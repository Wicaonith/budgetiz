import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router) { }


  public getUserUID(): string {
    let userId = localStorage.getItem("userUID");
    if (userId != null) {
      return userId;
    } else {
      return "";
    }
  }

  public redirectTo(uri: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => {
        this.router.navigate([uri]);
      }
    );
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  public getErrorMessageRequired(required: FormControl): string {
    if (required.hasError('required')) {
      return 'Valeur obligatoire';
    }
    return '';
  }
}
