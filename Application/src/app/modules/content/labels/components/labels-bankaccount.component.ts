import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { BankAccountsService } from 'src/app/shared/services/bankAccounts/bankaccounts.service';

@Component({
  selector: 'app-labels-bankaccount',
  templateUrl: './labels-bankaccount.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class LabelsBankAccountComponent implements OnInit {

  /** Objet section du formulaire */
  bankAccount: BankAccount = new BankAccount(0, "", "", "");
  /** Liste des Rubriques (ID/NAME/TYPE)*/
  bankAccounts: BankAccount[] = [];
  /** Colonnes à afficher dans le tableau des Rubriques */
  bankAccountColumns: Array<string> = ['id', 'name', 'type', 'edit', 'remove'];

  /**
   * Constructeur du composant SectionComponent 
   */
  constructor(private router: Router, private bankAccountsService: BankAccountsService) { }

  public ngOnInit(): void {
    //Appel du Service - Récupère toutes les Rubriques en base
    this.bankAccounts = this.bankAccountsService.readBankAccounts();
  }


  public updateSection(bankAccount: BankAccount): void {

    this.bankAccount = { ...bankAccount };
  }


  public deleteSection(id: number): void {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Rubrique.
      this.bankAccountsService.deleteBankAccount(id).then(() => this.redirectTo('budgetiz/labels/bankaccount'));
    } else {
      alert("Une donnée utilise la Rubrique. Veuillez la modifier");
    }
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
}
