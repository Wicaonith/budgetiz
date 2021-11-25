import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { EnumBankAccountType } from 'src/app/shared/enum/enumBankAccountType';
import { BankAccountsService } from 'src/app/shared/services/bankAccounts/bankaccounts.service';
import { Observable, of } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-form-bankaccount',
  templateUrl: './form-bankaccounts.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class FormBankAccountComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() bankAccount: BankAccount = new BankAccount("", 0, "", "", 0, "");
  /** Enum des Types de Catégoriess */
  enumTypeList = Object.values(EnumBankAccountType);
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);
  /** Permet de savoir si la Catégories soumise par le formulaire est à créer ou modifier */
  isModif: boolean = false;
  bankAccounts: Array<BankAccount> = new Array();


  addBankAccount: boolean = false;

  /** 
   * Constructeur du composant FormBankAccountComponent
   */
  public constructor(
    private bankAccountsService: BankAccountsService,
    private utilsService: UtilsService,
    private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    this.bankAccountsService.readBankAccountsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let bankAccount = data.data() as BankAccount;
            bankAccount.id = data.id;
            this.bankAccounts.push(bankAccount);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] LabelsCategoriesComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        this.lastId = this.utilsService.readLastId(this.lastId, this.bankAccounts);
      }
    );
    this.bankAccount.idUser = this.utilsService.getUserUID();
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si il n'existe pas de catégories avec cet ID...
    if (this.bankAccount.id === "") {
      // ... alors on le crée ...
      this.bankAccountsService.createBankAccount(this.bankAccount);
    } else {

      // ... alors on modifie l'existant.
      this.bankAccountsService.updateBankAccount(this.bankAccount);
    }
    // On recharge la page
    this.utilsService.redirectTo('budgetiz/labels/bankaccount')
  }

  public getErrorMessageRequired(): string {
    return this.utilsService.getErrorMessageRequired(this.required);
  }
}
