import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_TRANSACTION_VALUES } from '.';

export type TransactionType = {
  id: string;
  name: string;
  value: number;
  categoryId: number;
  date: Date;
  paymentType: string;
};

export type TransactionFormType = Omit<TransactionType, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private transactionsSubject = new BehaviorSubject<TransactionType[]>(
    DEFAULT_TRANSACTION_VALUES
  );
}
