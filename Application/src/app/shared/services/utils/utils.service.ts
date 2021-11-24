import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar) { }


  public getUserUID(): string {
    let userId = localStorage.getItem("userUID");
    if (userId != null) {
      return userId;
    } else {
      return "";
    }
  }


  public readLastId(currentLastId: number, list: any[]): number {

    let isInit: boolean = currentLastId === 0;

    // On parcourt tout
    for (let item of list) {
      // ... et si l'identifiant de la catégories est supérieur à la variable lastId..
      if (item.idBase > currentLastId) {
        // ... on valorise lastId.
        currentLastId = item.idBase;
      }
    }
    if (isInit) {
      // Valorise lastId avec le prochain Identifiant à ajouter.
      currentLastId += 1;
    }
    // Initialisation des valeurs dans les champs inputs
    return currentLastId;
  }

  public redirectTo(uri: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => {
        this.router.navigate([uri]);
      }
    );
  }


  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action), {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    };
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
