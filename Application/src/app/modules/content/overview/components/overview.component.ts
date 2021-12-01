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
  category?: OverviewCategory[];
}

export interface OverviewCategory {
  name: string;
  choosenAmount: number;
  annualAmount: number;
  undercategory?: OverviewUndercategory[];
}

export interface OverviewUndercategory {
  name: string;
  type: string;
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

  familyColumns = ['name', 'choosenAmount', 'annualAmount'];
  categoryColumns = ['name', 'choice', 'annual'];
  underCategoryColumns = ['name', 'choice', 'annual'];

  dataSource: MatTableDataSource<Family> = new MatTableDataSource();

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

    let lstFam: Family[] = [];
    let lstOC: OverviewCategory[] = [];
    let lstOU: OverviewUndercategory[] = [];

    // On initialise la liste des Familles 
    for (let type of this.enumTypeList) {
      let family: Family = {
        name: type,
        choosenAmount: 0,
        annualAmount: 0,
        category: []
      };
      lstFam.push(family);
    }

    //n°2
    for (let family of lstFam) {

      lstOC = [];
      for (let transaction of this.transactions) {

        if (transaction.undercategory.category.type === family.name) {

          let currentOC: OverviewCategory = {
            name: transaction.undercategory.category.name,
            choosenAmount: 0,
            annualAmount: 0,
            undercategory: []
          };
          if (lstOC.length === 0 || lstOC.some(el => el.name !== currentOC.name)) {
            lstOC.push(currentOC);
          }
        }
      }
      family.category = lstOC;
    }

    console.log(lstFam);


    for (let family of lstFam) {

      if (family.category !== undefined) {
        for (let cat of family.category) {
          lstOU = [];
          for (let transaction of this.transactions) {

            if (cat.name === transaction.undercategory.category.name) {

              // On crée la sous categ overview
              let currentOU: OverviewUndercategory = {
                name: transaction.undercategory.name,
                type: transaction.undercategory.category.type,
                choosenAmount: 0,
                annualAmount: transaction.amount
              };
              lstOU.push(currentOU);

              // Et on calcul le total de la categ overview 
              cat.annualAmount += transaction.amount;
            }
          }
          cat.undercategory = lstOU;
          family.annualAmount += cat.annualAmount;
        }
      }
    }

    this.dataSource = new MatTableDataSource(lstFam);
  }


  toggleRow(element: Family) {

  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
