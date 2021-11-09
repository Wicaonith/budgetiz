import { Component, OnInit } from '@angular/core';
import { TEST_BANKACCOUNT } from 'src/app/mock/mock-bankaccount';
import { TEST_DATAS } from 'src/app/mock/mock-data';
import { TEST_SECTION } from 'src/app/mock/mock-section';
import { TEST_UNDERSECTION } from 'src/app/mock/mock-undersection';
import { BankAccount } from 'src/app/models/bankAccount';
import { DataTransaction } from 'src/app/models/dataTransaction';
import { Section } from 'src/app/models/section';
import { Undersection } from 'src/app/models/undersection';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['../../pages.component.css']
})
export class DataComponent implements OnInit {

  /** Liste des Sous Rubriques (NAME/SECTION/TYPE/INTAB)*/
  datas: DataTransaction[] = [];

  /** Colonnes à afficher dans le tableau des Sous-Rubriques */
  datasColumns: string[] = ['id', 'month', 'section', 'undersection', 'amount', 'account', 'remove'];

  /** Liste des comptes */
  accounts: BankAccount[] = [];

  /** Liste des Rubriques */
  sections: Section[] = [];

  /** Liste des Sous-Rubriques par rapport à la Rubrique mère */
  undersections: Undersection[] = [];

  /** Liste des mois de l'année */
  months: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

  /** LastId */
  lastId: number = 0;

  /** Boolean d'affichage de la combo box ou non */
  disabledCombobox: boolean = true;

  /**
   * 
   */
  constructor() { }

  /**
   * 
   */
  ngOnInit(): void {

    // Appel aux Services pour read()
    this.datas = TEST_DATAS;
    this.accounts = TEST_BANKACCOUNT;
    this.sections = TEST_SECTION;
  }

  /**
   * Récupère le dernier id + 1
   */
  readLastId() {

    // Valorise l'attribut lastId avec le plus grand ID + 1
    // Appel Service
  }

  changeSection(nameSection: string) {

    this.disabledCombobox = false;
    // Initialise la liste undersections avec un filtre sur le nom de la Rubrique mère
    // Appel service
  }

  controlData(id: string, month: string, sectionName: string, undersectionName: string, amount:string, accountName: string) {
    // Appel service
  }

  createData(id: string, month: string, sectionName: string, undersectionName: string, amount:string, accountName: string) {

    var dataAmount = Number(amount);
    // Appel service
  }

  removeData(data: DataTransaction) {
    // Appel service
  }
}
