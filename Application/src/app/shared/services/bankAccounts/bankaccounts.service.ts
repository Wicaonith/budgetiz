import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BankAccount } from '../../models/bankAccount.model';
import { FirestoreCrudService } from '../firestoreCrud.service';

@Injectable({
  providedIn: 'root'
})
/**
 * 
 */
export class BankAccountsService {

  // Path de la BDD Firebase pour la table BankAccount
  private dbPath = '/bankaccounts';

  crudService: FirestoreCrudService<BankAccount>;

  constructor(afs: AngularFirestore) {
    this.crudService = new FirestoreCrudService<BankAccount>(afs, this.dbPath);
  }

  public createBankAccount(bankAccount: BankAccount): any {

    // Insertion en base de la Rubrique
    return this.crudService.add({ ...bankAccount }, bankAccount.id).then(() => {
      this.log(`Création du compte n°${bankAccount.id}`); // Lorsque la création se passe bien
    });
  }

  public readBankAccounts(): any {
    return this.crudService.list();
  }

  public readBankAccount(id: number): any {
    return this.crudService.get(id);
  }

  public updateBankAccount(bankAccount: BankAccount): any {

    return this.crudService.update({ ...bankAccount }).then(() => {
      console.log(`Modification du compte n°${bankAccount.id}`); // Lorsque la modification se passe bien
    });
  }

  public deleteBankAccount(id: number): any {

    return this.crudService.delete(id).then(() => {
      console.log(`Suppression ddu compte n°${id}`); // Lorsque la suppression se passe bien
    });
  }

  private log(log: string) {
    console.info(log);
  }
}
