import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { BankAccountsService } from 'src/app/shared/services/bankAccounts/bankaccounts.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class OverviewComponent implements OnInit {

  year: number = new Date().getFullYear();

  // Liste pour les Selects
  bankAccounts: Array<BankAccount> = new Array();

  required = new FormControl('', [Validators.required]);

  defaultBankAccount?: string;

  constructor(
    private ts: TransactionsService,
    private utilsService: UtilsService,
    private baService: BankAccountsService) { }

  ngOnInit(): void {


    // Récupération de la liste des comptes
    this.initializeBankAccounts();

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
        )
      }
    ).finally(
      () => {
        // Initialise par défaut le combobox avec le premier compte bancaire remonté.
        this.defaultBankAccount = this.bankAccounts[0].name;
      }
    );
  }




  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
