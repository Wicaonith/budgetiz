import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, Query } from '@angular/fire/firestore';
import { Transaction } from '../../models/transaction.model';
import { FirestoreCrudService } from '../firestoreCrud.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private dbPath = '/transactions';

  crudService: FirestoreCrudService<Transaction>;

  constructor(afs: AngularFirestore, private utils: UtilsService) {
    // Let's create our CrusService and use the a Collection with the name 'categories'
    this.crudService = new FirestoreCrudService<Transaction>(afs, this.dbPath);
  }


  public createTransaction(transaction: Transaction): any {

    // Insertion en base de la Sous-Catégories
    return this.crudService.add({ ...transaction }).then(() => {
      this.log(`Création de la Transaction`); // Lorsque la création se passe bien
    });
  }

  public readTransactions(): any {

    return this.crudService.list();
  }

  public readTransactionsByUserId(): Query<DocumentData> {

    return this.crudService.listByUser(this.utils.getUserUID());
  }

  public readTransactionsByUserIdAndAccount(account: string): Query<DocumentData> {

    return this.crudService.listByUserAndAccount(this.utils.getUserUID(), account);
  }

  public readTransaction(id: string): any {

    return this.crudService.get(id);
  }

  public updateTransaction(transaction: Transaction): any {

    return this.crudService.update({ ...transaction }).then(() => {
      console.log(`Modification de la Transaction n°${transaction.id}`); // Lorsque la modification se passe bien
    });
  }

  public deleteTransaction(id: string): any {

    return this.crudService.delete(id).then(() => {
      console.log(`Suppression de laTransaction n°${id}`); // Lorsque la suppression se passe bien
    });
  }

  private log(log: string) {
    console.info(log);
  }
}
