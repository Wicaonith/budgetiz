import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  public getUserUID(): string {
    let userId = localStorage.getItem("userUID");
    if (userId != null) {
      return userId;
    } else {
      return "";
    }
  }
}
