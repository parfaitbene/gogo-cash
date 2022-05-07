import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  getTransactionById(id: number) {
    return;
  }

  save(transaction: Transaction) {
    return new Promise((resolve, reject) => {
      resolve(transaction);
    });
  }
}
