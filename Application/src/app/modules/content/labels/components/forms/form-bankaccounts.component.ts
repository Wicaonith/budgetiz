import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { EnumBankAccountType } from 'src/app/shared/enum/enumBankAccountType';
import { BankAccountService } from 'src/app/shared/services/bankAccount/bankaccount.service';

@Component({
  selector: 'app-form-bankaccount',
  templateUrl: './form-bankaccounts.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class FormBankAccountComponent implements OnInit {

  /** L'objet lié au Formulaire */
  @Input() bankAccount: BankAccount = new BankAccount(0, "", "");
  /** Enum des Types de Rubriques */
  enumTypeList = Object.values(EnumBankAccountType);
  /** Dernier identifiant */
  lastId: number = 0;
  /** FormControl pour vérifier la validité des champs */
  required = new FormControl('', [Validators.required]);

  /** 
   * Constructeur du composant FormBankAccountComponent
   */
  public constructor(private bankAccountService: BankAccountService, private router: Router) { }

  /**
   * Initialise le composant
   */
  public ngOnInit(): void {

    //Appel du Service - Récupère toutes les Rubriques en base
    this.bankAccountService.readBankAccounts().subscribe(
      (bankAccounts: BankAccount[]) => {

        let isInit: boolean = this.lastId === 0;
        for (let bankAccount of bankAccounts) {
          // ... et si l'identifiant de la rubrique est supérieur à la variable lastId..
          if (bankAccount.id > this.lastId) {
            // ... on valorise lastId.
            this.lastId = bankAccount.id;
          }
        }
        if (isInit) {
          // Valorise lastId avec le prochain Identifiant à ajouter.
          this.lastId += 1;
        }

        // Initialisation des valeurs dans les champs inputs
        this.bankAccount.id = this.lastId;
      }
    );
  }

  /** 
   * Lance la modification ou la création après l'enregistrement du formulaire
   */
  public onSubmit(): void {

    // Si on récupère une Rubrique via l'ID, alors c'est qu'il existe, donc on appel la méthode "update" sinon "create"
    let ba = this.bankAccountService.readBankAccount(this.bankAccount.id);
    // Si il n'existe pas de rubrique avec cet ID...
    if (ba === undefined) {
      // ... alors on le crée ...
      this.bankAccountService.createBankAccount(this.bankAccount);
    } else {

      // ... alors on modifie l'existant.
      this.bankAccountService.updateBankAccount(this.bankAccount);
    }
    // On recharge la page
    this.redirectTo('budgetiz/labels/bankaccount')
  }

  /**
   * Redirige vers l'url passé en paramètre
   * 
   * @param uri string - l'url de redirection
   */
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  /** 
   * Gère les erreurs si requis
   */
  public getErrorMessageRequired(): string {
    if (this.required.hasError('required')) {
      return 'Valeur obligatoire';
    }
    return '';
  }

}
