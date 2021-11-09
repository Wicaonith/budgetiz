import { Component, OnInit } from '@angular/core';
import { TEST_BANKACCOUNT } from 'src/app/mock/mock-bankaccount';
import { BankAccount } from 'src/app/models/bankAccount';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';

@Component({
  selector: 'app-bankaccount',
  templateUrl: './bankaccount.component.html',
  styleUrls: ['../../../pages.component.css']
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
   * Contrôle dans la base si une rubrique n'existe pas déjà avec la paire name/type
   * 
   * @param name - string - Le libellé de la rubrique à contrôler
   * @param type - string - Le type de la rubrique à contrôler
   */
  controlBankAccount(name: string, type: string): void {
    // TODO Contrôle dans la base si une rubrique n'existe pas déjà avec la pair name/type
    console.log("ControlBankAccount");
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
