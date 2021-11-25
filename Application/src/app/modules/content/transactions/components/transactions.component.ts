import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EnumMonth } from 'src/app/shared/enum/enumMonth';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { Category } from 'src/app/shared/models/category.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { Undercategory } from 'src/app/shared/models/undercategory.model';
import { BankAccountsService } from 'src/app/shared/services/bankAccounts/bankaccounts.service';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class TransactionsComponent implements OnInit {

  // Formulaire
  @Input() transaction?: Transaction;

  required = new FormControl('', [Validators.required]);

  // Liste pour les Selects
  categories: Array<Category> = new Array();
  bankAccounts: Array<BankAccount> = new Array();
  undercategories: Array<Undercategory> = new Array();

  // Filtre sur les Undercategory en fonction du nom de la Category
  filterCategory: string = "";

  /** Enum des Types de Catégoriess */
  enumMonth = Object.values(EnumMonth);
  /** Prochain identifiant à ajouter pour l'utilisateur en cours */
  lastId: number = 0;

  addTransaction: boolean = true;

  // Table
  /** Colonnes à afficher dans le tableau des Catégories */
  transactionsColumns: Array<string> = ['idBase', 'year', 'month', 'date', 'amount', 'category', 'undercategory', 'account', 'edit', 'remove'];
  filterColumns: Array<string> = ['filterId', 'filterYear', 'filterMonth', 'filterDate', 'filterAmount', 'filterCategory', 'filterUndercategory', 'filterAccount', 'filterEdit', 'filterRemove'];

  transactions: Array<Transaction> = new Array();

  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  filterIdBase: string = "";

  constructor(
    private ts: TransactionsService,
    private utilsService: UtilsService,
    private catService: CategoryService,
    private baService: BankAccountsService) { }

  public ngOnInit(): void {

    this.transaction = this.initializeInputTransaction();

    // Récupération de la liste des Catégories
    this.initializeCategories();

    // Récupération de la liste des comptes
    this.initializeBankAccounts();

    // Mise à jour de la MatTableDataSource

  }

  public initializeInputTransaction(): Transaction {

    let lastId = this.utilsService.readLastId(this.lastId, new Array<Transaction>());// TODO Récupérer le lastId
    let year: number = new Date().getFullYear();
    let date: Date = new Date();
    let category: Category = new Category("", 0, "", "", "");
    let undercategory: Undercategory = new Undercategory("", 0, "", category, true, "");
    let bankAccount: BankAccount = new BankAccount("", 0, "", "", 0, "");
    let description: string = "";
    let idUser = this.utilsService.getUserUID();

    this.transactions.push(new Transaction("", lastId, year, "", date, 0, undercategory, bankAccount, description, idUser));

    this.dataSource = new MatTableDataSource(this.transactions);

    return new Transaction("", lastId, year, "", date, 0, undercategory, bankAccount, description, idUser);
  }


  private initializeCategories(): void {

    this.catService.readCategoriesByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let category = data.data() as Category;
            category.id = data.id;
            this.categories.push(category);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] TransactionsComponent - initializeCategories()`, err);
          }
        );
      }
    );
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
            this.utilsService.handleError(`[Erreur] TransactionsComponent - initializeBankAccounts()`, err);
          }
        );
      }
    );
  }

  public onSubmit(): void {

  }

  public updateTransaction(transaction: Transaction) {

    this.transaction = { ...transaction };
  }

  public deleteTransaction(id: string): void {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Catégories.

    } else {
      alert("Une donnée utilise la Catégories. Veuillez la modifier");
    }
  }

  public controlFillCategory(): void {
    if (this.filterCategory === "") {
      this.utilsService.openSnackBar("Selectionnez une catégorie avant une sous-catégorie", "OK");
    }
  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
