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
  @Input() bankAccount: BankAccount = new BankAccount("", 0, "", "", "");
  /** Enum des Types de Rubriques */
  enumTypeList = Object.values(EnumBankAccountType);
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);
  /** Permet de savoir si la Rubrique soumise par le formulaire est à créer ou modifier */
  isModif: boolean = false;
  bankAccounts: Array<BankAccount> = new Array();

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

    //Appel du Service - Récupère toutes les Rubriques en base
    this.bankAccountsService.readBankAccountsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let bankAccount = data.data() as BankAccount;
            bankAccount.id = data.id;
            this.bankAccounts.push(bankAccount);
          },
          (err: any) => {
            this.utilsService.handleError(`[Erreur] LabelsSectionsComponent - ngOnInit()`, err);
          }
        );
      }
    );
    // On valorise les Rubriques récupérées dans la dataSource de la Table 
    this.readLastId();
    this.bankAccount.idUser = this.utilsService.getUserUID();
  }

  public readLastId(): void {

    this.bankAccountsService.readBankAccounts().subscribe(
      (bankAccounts: BankAccount[]) => {
        let isInit: boolean = this.lastId === 0;
        for (let bankAccount of bankAccounts) {
          // ... et si l'identifiant de la rubrique est supérieur à la variable lastId..
          if (bankAccount.idBase > this.lastId) {
            // ... on valorise lastId.
            this.lastId = bankAccount.idBase;
          }
        }
        if (isInit) {
          // Valorise lastId avec le prochain Identifiant à ajouter.
          this.lastId += 1;
        }

        // Initialisation des valeurs dans les champs inputs
        this.bankAccount.idBase = this.lastId;
      }
    );
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si il n'existe pas de rubrique avec cet ID...
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
