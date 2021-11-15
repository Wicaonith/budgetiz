import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Undersection } from '../models/undersection';

@Injectable({
  providedIn: 'root',
})
export class UndersectionService {

  private undersectionsApiUrl = 'http://localhost:8080/api/undersection';

  public constructor(private http: HttpClient) { }

  /**
   * Créer la Sous-Rubrique à créer
   * 
   * @param undersection - Undersection - La sous-Rubrique à creer
   */
  public createUndersection(undersection: Undersection): Observable<Undersection> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(undersection.inTab);
    return this.http.post(this.undersectionsApiUrl, undersection, httpOptions).pipe<any, Undersection>(
      tap(_ => this.log(`Modification de la Rubrique n°${undersection.id}`)), // Lorsque la récupération se passe bien
      catchError(this.handleError<any>(`[Erreur] UndersectionService - createUndersection(${undersection.id})`)) // Lors d'une erreur
    );
  }

  /**
   * Récupère dans la base les informations de toutes les Sous-Rubriques
   * 
   * @returns Undersection[] - Liste des Sous-Rubriques
   */
  public readUndersections(): Observable<Undersection[]> {

    return this.http.get<Undersection[]>(this.undersectionsApiUrl).pipe(
      tap(_ => this.log(`Récupération de la liste des Sous-Rubriques`)), // Lorsque la récupération se passe bien
      catchError(this.handleError(`[Erreur] UndersectionService - readUndersections()`, [])) // Lors d'une erreur
    );
  }

  /**
   * Récupère dans la base les informations d'une Sous-Rubrique par rapport à son identifiant
   * 
   * @param id - number - L'identifiant de la Sous-Rubrique à lire
   * 
   * @returns Section - La Sous-Rubrique lié à l'ID
   */
  public readUndersection(id: number): Observable<Undersection> {

    const url = `${this.undersectionsApiUrl}/${id}`;

    return this.http.get<Undersection>(url).pipe(
      tap(_ => this.log(`Récupération de la Rubrique`)), // Lorsque la récupération se passe bien
      catchError(this.handleError<Undersection>(`[Erreur] UndersectionService - readUndersection(${id})`)) // Lors d'une erreur
    );
  }

  /**
   * Modifie la Sous-Rubrique correspondante a celle passé en paramètre
   * 
   * @param undersection - Undersection - La Sous-Rubrique à modifier
   */
  public updateUndersection(undersection: Undersection): Observable<Undersection> {

    const url = `${this.undersectionsApiUrl}/${undersection.id}`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(url, undersection, httpOptions).pipe<any, Undersection>(
      tap(_ => this.log(`Modification de la Rubrique n°${undersection.id}`)), // Lorsque la récupération se passe bien
      catchError(this.handleError<any>(`[Erreur] UndersectionService - updateUndersection(${undersection.id})`)) // Lors d'une erreur
    );
  }

  /**
   * Supprime la Sous-Rubrique correspondante à celle passé en paramètre
   * 
   * @param undersection - Undersection - La Sous-Rubrique à supprimer
   */
  public deleteUndersection(undersection: Undersection): Observable<Undersection> {

    const url = `${this.undersectionsApiUrl}/${undersection.id}`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete(url, httpOptions).pipe<any, Undersection>(
      tap(_ => this.log(`Suppression de la Rubrique n°${undersection.id}`)), // Lorsque la récupération se passe bien
      catchError(this.handleError<any>(`[Erreur] UndersectionService - deleteUndersection(${undersection.id})`)) // Lors d'une erreur
    );
  }

  /**
   * Supprime la Sous-Rubrique correspondante à celle passé en paramètre
   * 
   * @param undersection - Undersection - La Sous-Rubrique à supprimer
   */
  public deleteUndersections(): Observable<Undersection> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete(this.undersectionsApiUrl, httpOptions).pipe<any, Undersection>(
      tap(_ => this.log(`Suppression de toutes les Sous-Rubrique `)), // Lorsque la récupération se passe bien
      catchError(this.handleError<any>(`[Erreur] UndersectionService - deleteUndersections()`)) // Lors d'une erreur
    );
  }


  /**
   * Permet la gestion de log
   * 
   * @param log - string - 
   */
  private log(log: string) {
    console.info(log);
  }

  /**
   * Gestion des erreurs
   * 
   * @param operation 
   * @param result 
   * 
   * @returns 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
