import { Injectable } from '@angular/core';
import { Section } from '../models/section';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class SectionService {

  private sectionsApiUrl = 'api/sections';

  public constructor(private http: HttpClient) { }
  /**
   * Créer une Rubrique dans la base
   * 
   * @param section - Section - La Rubrique à créer
   */
  public createSection(section: Section) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.sectionsApiUrl, section, httpOptions).pipe<any, Section>(
      tap(_ => this.log(`Modification de la Rubrique n°${section.id}`)), // Lorsque la récupération se passe bien
      catchError(this.handleError<any>(`[Erreur] SectionService - updateSection(${section.id})`)) // Lors d'une erreur
    );
  }

  /**
   * Récupère dans la base les informations de toutes les Rubriques
   * 
   * @returns Observable<Section[]> - Liste des Rubriques
   */
  public readSections(): Observable<Section[]> {

    return this.http.get<Section[]>(this.sectionsApiUrl).pipe(
      tap(_ => this.log(`Récupération de la liste des Rubriques`)), // Lorsque la récupération se passe bien
      catchError(this.handleError(`[Erreur] SectionService - readSections()`, [])) // Lors d'une erreur
    );
  }

  /**
   * Récupère dans la base les informations d'une Rubrique par rapport à son nom et son type.
   * 
   * @param id - number - L'identifiant de la Rubrique à lire
   * 
   * @returns Section - La Rubrique lié à l'ID
   */
  public readSection(id: number): Observable<Section> {

    const url = `${this.sectionsApiUrl}/${id}`;

    return this.http.get<Section>(url).pipe(
      tap(_ => this.log(`Récupération de la Rubrique`)), // Lorsque la récupération se passe bien
      catchError(this.handleError<Section>(`[Erreur] SectionService - readSection(${id})`)) // Lors d'une erreur
    );
  }

  /**
   * Modifie la Rubrique correspondante a celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à modifier
   */
  public updateSection(section: Section): Observable<Section> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.sectionsApiUrl, section, httpOptions).pipe<any, Section>(
      tap(_ => this.log(`Modification de la Rubrique n°${section.id}`)), // Lorsque la récupération se passe bien
      catchError(this.handleError<any>(`[Erreur] SectionService - updateSection(${section.id})`)) // Lors d'une erreur
    );
  }

  /**
   * Supprime la Rubrique correspondante à celle passé en paramètre
   * 
   * @param section - Section - La Rubrique à supprimer
   */
  public deleteSection(section: Section) : Observable<Section>{

    const url = `${this.sectionsApiUrl}/${section.id}`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete(url, httpOptions).pipe<any, Section>(
      tap(_ => this.log(`Suppression de la Rubrique n°${section.id}`)), // Lorsque la récupération se passe bien
      catchError(this.handleError<any>(`[Erreur] SectionService - deleteSection(${section.id})`)) // Lors d'une erreur
    );
  }

  /**
   * Contrôle l'existance dans la base d'une Rubrique par rapport à son nom et son type.
   * 
   * @param name - string - Le nom de la Rubrique à controler
   * @param type - string - Le type de la Rubrique à controler
   * 
   * @returns boolean - true si elle existe
   */
  public controlSection(name: string, type: string): boolean {

    // Récupération de toutes les Rubriques
    /*let sections = this.readSections();
  
    // On parcourt toutes les Rubriques...
    for (let section of sections) {
      // ... et s'il en existe une similaire...
      if (section.name === name && section.type === type) {
        //... on retourne true
        return true;
      }
    }*/
    // Cas où la Rubrique n'existe pas.
    return false;
  }

  public existSection(id: number) {

    // Récupération de toutes les Rubriques
    let sections = this.readSections();

    // On parcourt toutes les Rubriques...
    /*for (let section of sections) {
      // ... et s'il en existe une similaire...
      if (section.id === id) {
        //... on retourne true
        return true;
      }
    }*/
    // Cas où la Rubrique n'existe pas.
    return false;
  }

  /**
   * Formatte le nom de la Rubrique sous la forme "[R] Salaire"
   * [1ere lettre du type] + Nom 
   * 
   * @param name - string - Le libellé à formatter
   * @param type - string - Le type nécessaire au formattage
   * 
   * @returns string - Le nom de la Rubrique formatté
   */
  public formatSectionName(name: string, type: string): string {

    return "[" + type.substr(0, 1) + "] " + name;
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