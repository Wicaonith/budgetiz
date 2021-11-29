import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EnumCategoryType } from 'src/app/shared/enum/enumCategoryType';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { Category } from 'src/app/shared/models/category.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { BankAccountsService } from 'src/app/shared/services/bankAccounts/bankaccounts.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

export interface Family {
  name: string;
  choosenAmount: number;
  annualAmount: number;
  category?: OverviewCategory[] | MatTableDataSource<OverviewCategory>;
}

export interface OverviewCategory {
  name: string;
  choosenAmount: number;
  annualAmount: number;
  undercategory?: OverviewUndercategory[] | MatTableDataSource<OverviewUndercategory>;
}

export interface OverviewUndercategory {
  name: string;
  choosenAmount: number;
  annualAmount: number;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class OverviewComponent implements OnInit {


  table: Array<Family> = new Array();

  typeColumns = ['name', 'choice', 'annual'];
  categoryColumns = ['name', 'choice', 'annual'];
  underCategoryColumns = ['name', 'choice', 'annual'];


  /** Enum des Types de Catégoriess */
  enumTypeList = Object.values(EnumCategoryType);

  // Liste pour les Selects
  bankAccounts: Array<BankAccount> = new Array();

  transactions: Array<Transaction> = new Array();

  year: number = new Date().getFullYear();
  required = new FormControl('', [Validators.required]);

  defaultBankAccount?: string;

  constructor(
    private ts: TransactionsService,
    private utilsService: UtilsService,
    private baService: BankAccountsService) { }

  ngOnInit(): void {

    // TODO Récupération de la liste de années présentes dans les transactions pour un utilisateur

    // Récupération de la liste des comptes
    this.initializeBankAccounts();

    //Récupération de la liste des transactions pour l'utilisateur en cours
    this.initializeTransactions();


  }

  public initializeBankAccounts(): void {

    this.baService.readBankAccountsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let bankAccount = data.data() as BankAccount;
            bankAccount.id = data.id;
            this.bankAccounts.push(bankAccount);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] OverviewComponent - initializeBankAccounts()`, err);
          }
        )
      }
    ).finally(
      () => {
        // Initialise par défaut le combobox avec le premier compte bancaire remonté.
        this.defaultBankAccount = this.bankAccounts[0].name;
      }
    );
  }

  public initializeTransactions(): void {
    this.ts.readTransactionsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          (data) => {
            let transaction = data.data() as Transaction
            transaction.id = data.id;
            this.transactions.push(transaction);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] OverviewComponent - initializeTransactions()`, err);
          }
        )
      }
    ).finally(
      () => {
        //Initilisation du tableau imbriqué
        this.initializeTable();
      }
    );
  }


  public initializeTable(): void {

    let lstCat: string[] = [];

    let lstOC: OverviewCategory[] = [];


    // On parcours une premiere fois toutes les transactions pour 
    for (let transaction of this.transactions) {

      if (lstCat.indexOf(transaction.undercategory.category.name) < 0) { // On vérifie qu'il n'y ai pas 2 fois la même catégorie
        lstCat.push(transaction.undercategory.category.name);
      }
    }

    for (let cat of lstCat) {

      // Et on crée une liste de OverviewCategory
      let currentOC: OverviewCategory = {
        name: cat,
        choosenAmount: 0,
        annualAmount: 0,
        undercategory: []
      };
      lstOC.push(currentOC);
    }


    // Pour chaque OverviewCategory
    for (let oc of lstOC) {

      let lstOU: OverviewUndercategory[] = [];

      for (let transaction of this.transactions) {

        if (oc.name === transaction.undercategory.category.name) {

          // On crée la sous categ overview
          let currentOU: OverviewUndercategory = {
            name: transaction.undercategory.name,
            choosenAmount: 0,
            annualAmount: transaction.amount
          };
          lstOU.push(currentOU);

          // Et on calcul le total de la categ overview 
          oc.annualAmount += transaction.amount;
        }
      }
      oc.undercategory = lstOU;
    }

    /*// Pour chaque type de catégorie
    for (let type of this.enumTypeList) {

      // Initialisation de la famille en cours
      let currentFamily: Family = { name: type, choosenAmount: 0, annualAmount: 0, category: [] };

      let category = [];

            let currentOC: OverviewCategory = {
        name: transaction.undercategory.category.name,
        choosenAmount: 0,
        annualAmount: 0,
        undercategory: []
      };

      let currentFamily: Family = {
        name: '',
        choosenAmount= 0,
        annualAmount = 0,
        category = []
      };
      currentFamily.category = lstOC;

      lstOC.push(currentOC);


      let currentOU: OverviewUndercategory = {
        name: transaction.undercategory.name,
        choosenAmount: 0,
        annualAmount: transaction.amount
      };
      lstOU.push(currentOU);

      // On parcours une premiere fois toutes les transactions pour 
      for (let transaction of this.transactions) {

        let currentOU: OverviewUndercategory = {
          name: transaction.undercategory.name,
          choosenAmount: 0,
          annualAmount: transaction.amount
        };
        lstOU.push(currentOU);


      }
    }*/

    if (this.transactions && Array.isArray(this.transactions) && this.transactions.length) {
    }
  }




  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
