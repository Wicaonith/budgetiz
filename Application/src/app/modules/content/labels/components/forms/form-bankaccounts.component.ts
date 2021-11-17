import { Component, OnInit } from '@angular/core';
import { TEST_BANKACCOUNT } from 'src/app/mock/mock-bankaccount';
import { BankAccount } from 'src/app/models/bankAccount.model';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';

@Component({
  selector: 'app-bankaccount',
  templateUrl: './bankaccount.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class BankAccountComponent implements OnInit {

  /** Liste des Comptes (NAME/TYPE)*/
  account: Array<BankAccount> = new Array();
  /** Colonnes à afficher dans le tableau des Comptes */
  accountColumns: Array<string> = ['name', 'type', 'remove'];

  /** Enum Type*/
  enumTypeList = Object.values(EnumSectionType);


  /**
   * Constructeur vide
   */
  constructor() { }


  /**
   * Appel a l'initialisation
   * Instancie le tableau des Sous-Rubriques
   */
  ngOnInit(): void {
    this.account = TEST_BANKACCOUNT;
  }

  /**
   * Créer dans la base le compte bancaire avec la paire nom/type
   * 
   * @param name - string - Le libellé de la rubrique à créer
   * @param type - string - Le type de la rubrique à créer
   */
  createBankAccount(name: string, type: string): void {
    console.log("createBankAccount");
  }

  /**
   * Supprime le compte bancaire correspondant a la ligne.
   * 
   * @param section - Section - La section à supprimer
   */
  removeBankAccount(bankAccount: BankAccount) {
    console.log("removeBankAccount");
  }

}
