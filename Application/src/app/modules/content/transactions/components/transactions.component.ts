import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnumMonth } from 'src/app/shared/enum/enumMonth';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { Category } from 'src/app/shared/models/category.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { Undercategory } from 'src/app/shared/models/undercategory.model';
import { BankAccountsService } from 'src/app/shared/services/bankAccounts/bankaccounts.service';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { UndercategoryService } from 'src/app/shared/services/undercategories/undercategory.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class TransactionsComponent implements OnInit {

  // Formulaire
  @Input() transaction: Transaction = this.initializeInputTransaction();

  required = new FormControl('', [Validators.required]);

  // Liste pour les Selects
  categories: Array<Category> = new Array();
  bankAccounts: Array<BankAccount> = new Array();
  undercategories: Array<Undercategory> = new Array();

  // Filtre sur les Undercategory en fonction du nom de la Category
  filterCategory: Category = new Category("", 0, "", "", "", false);

  /** Enum des Types de Catégoriess */
  enumMonth = Object.values(EnumMonth);
  /** Prochain identifiant à ajouter pour l'utilisateur en cours */
  lastId: number = 0;

  addTransaction: boolean = true;

  // Table
  /** Colonnes à afficher dans le tableau des Catégories */
  transactionsColumns: Array<string> = ['idBase', 'year', 'month', 'date', 'amount', 'category', 'undercategory', 'account', 'edit', 'remove'];

  transactions: Array<Transaction> = new Array();

  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  filterIdBase: string = "";

  constructor(
    private ts: TransactionsService,
    private utilsService: UtilsService,
    private catService: CategoryService,
    private undercatService: UndercategoryService,
    private baService: BankAccountsService) { }

  public ngOnInit(): void {

    //Récupération de la liste des Transactions
    this.initializeTransactions();

    // Récupération de la liste des Catégories
    this.initializeCategories();

    // Récupération de la liste des comptes
    this.initializeBankAccounts();

    // Initialisation de l'objet servant pour le formulaire
    //this.transaction = this.initializeInputTransaction();

    // Mise à jour de la MatTableDataSource
    this.loadTable();
  }

  public initializeTransactions(): void {
    this.ts.readTransactionsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          (data) => {
            let transaction = data.data() as Transaction;
            transaction.id = data.id;
            this.transactions.push(transaction);
          }
        )
      }
    ).finally(
      () => {
        // On valorise les Catégories récupérées dans la dataSource de la Table 
        this.loadTable();
        this.transaction.idBase = this.utilsService.readLastId(this.lastId, this.transactions);
        this.lastId = this.utilsService.readLastId(this.lastId, this.transactions);
      }
    );
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

  public initializeInputTransaction(): Transaction {

    let lastId = 0;
    let year: number = new Date().getFullYear();
    let date: Date = new Date();
    let category: Category = new Category("", 0, "", "", "", false);
    let undercategory: Undercategory = new Undercategory("", 0, "", category, true, "", false);
    let bankAccount: BankAccount = new BankAccount("", 0, "", "", 0, "", false);
    let description: string = "";
    let idUser = this.utilsService.getUserUID();
    let isDeleted = false;

    this.dataSource = new MatTableDataSource(this.transactions);

    return new Transaction("", lastId, year, "", date, 0, undercategory, bankAccount, description, idUser, isDeleted);
  }

  public loadTable(): void {

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.dataSource.data = this.transactions;
  }

  public fillUndercategoryByCategory() {

    this.undercatService.readUndercategorysByUserIdAndCategory(this.filterCategory.name).get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let undercategory = data.data() as Undercategory;
            undercategory.id = data.id;
            this.undercategories.push(undercategory);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] TransactionsComponent - fillUndercategoryByCategory()`, err);
          }
        );
      }
    );
  }

  public onSubmit(): void {

    //Contrôle sur l'objet Transaction valorisé

    // Enregistrement de la transaction
    // Si il n'existe pas de transaction avec cet ID...
    if (this.transaction.id === "") {
      // ... on le crée ...
      this.ts.createTransaction(this.transaction);
    } else {
      // ... sinon on modifie l'existant.
      this.ts.updateTransaction(this.transaction);
    }
    this.utilsService.redirectTo('budgetiz/transactions');
  }

  public updateTransaction(transaction: Transaction) {

    this.addTransaction = true;

    this.transaction = { ...transaction };
    this.transaction.account = { ...transaction.account };
    this.transaction.undercategory = { ...transaction.undercategory };
  }

  public deleteTransaction(id: string): void {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Catégories.
      this.ts.deleteTransaction(id).then(() => this.utilsService.redirectTo('budgetiz/transactions'));
    } else {
      alert("Une donnée utilise la Catégories. Veuillez la modifier");
    }
  }

  public controlFillCategory(): void {
    if (this.filterCategory.name === "") {
      this.utilsService.openSnackBar("Selectionnez une catégorie avant une sous-catégorie", "OK");
    }
  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
