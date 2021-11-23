import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnumMonth } from 'src/app/shared/enum/enumMonth';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { Category } from 'src/app/shared/models/category.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { Undercategory } from 'src/app/shared/models/undercategory.model';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class TransactionsComponent implements OnInit {

  @Input() transaction?: Transaction;

  required = new FormControl('', [Validators.required]);

  // Liste pour les Selects
  categories: Array<Category> = new Array();
  bankAccounts: Array<BankAccount> = new Array();
  undercategories: Array<Undercategory> = new Array();

  // Filtre sur les Undercategory en fonction du nom de la Category
  filtreCategory: string = "";

  /** Enum des Types de Catégoriess */
  enumMonth = Object.values(EnumMonth);
  /** Prochain identifiant à ajouter pour l'utilisateur en cours */
  lastId: number = 0;


  constructor(
    private ts: TransactionsService,
    private utilsService: UtilsService,
    private router: Router) { }

  public ngOnInit(): void {

    this.transaction = this.initializeInputTransaction();
  }

  public initializeInputTransaction(): Transaction {
    let date: Date = new Date();
    let category: Category = new Category("", 0, "", "", "");
    let undercategory: Undercategory = new Undercategory("", 0, "", category, true, "");
    let bankAccount: BankAccount = new BankAccount("", 0, "", "", "")

    return new Transaction("", 0, 0, "", date, 0, undercategory, bankAccount, "");
  }


  public onSubmit(): void {

  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
