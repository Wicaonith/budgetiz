import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BankAccount } from 'src/app/shared/models/bankAccount.model';
import { BankAccountsService } from 'src/app/shared/services/bankAccounts/bankaccounts.service';

@Component({
  selector: 'app-labels-bankaccount',
  templateUrl: './labels-bankaccount.component.html',
  styleUrls: ['../../../../../app.component.css']
})
export class LabelsBankAccountComponent implements OnInit {

  /** Objet category du formulaire */
  bankAccount: BankAccount = new BankAccount("", 0, "", "", 0, "", false);
  /** Liste des Catégoriess (ID/NAME/TYPE)*/
  bankAccounts: Array<BankAccount> = new Array();
  /** Colonnes à afficher dans le tableau des Catégoriess */
  bankAccountColumns: Array<string> = ['idBase', 'name', 'type', 'edit', 'remove'];
  /** Données du tableau : Liste des Comptes Bancaires */
  datasource: MatTableDataSource<BankAccount> = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort = new MatSort;


  constructor(private router: Router, private bankAccountsService: BankAccountsService) { }

  public ngOnInit(): void {
    //Appel du Service - Récupère toutes les Comptes en base
    this.bankAccountsService.readBankAccountsByUserId().get().then(
      (querySnapshot) => {
        querySnapshot.forEach(
          data => {
            let bankAccount = data.data() as BankAccount;
            bankAccount.id = data.id;
            this.bankAccounts.push(bankAccount);
          },
          (err: any) => {
            this.handleError(`[Erreur] LabelsCategoriesComponent - ngOnInit()`, err);
          }
        );
      }
    ).finally(
      () => {
        // On valorise les Catégoriess récupérées dans la dataSource de la Table 
        this.reloadTable();
      }
    );
  }

  reloadTable() {
    // Met à jour le tableau
    this.datasource.data = this.bankAccounts;
    if (this.sort) { // Vérifier qu'il y a bien un tri
      this.datasource.sort = this.sort;
    }
  }

  public updateCategory(bankAccount: BankAccount): void {

    this.bankAccount = { ...bankAccount };
  }


  public deleteCategory(id: string): void {

    // Controle si une données l'utilise pas !
    if (true) {
      //... alors Appel du service - Supprime la Catégories.
      this.bankAccountsService.deleteBankAccount(id).then(() => this.redirectTo('budgetiz/labels/bankaccount'));
    } else {
      alert("Une donnée utilise la Catégories. Veuillez la modifier");
    }
  }


  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
