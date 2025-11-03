import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TransactionsService,
  TransactionType,
} from '../../services/transactions.service';
import { CreateTransactionButtonComponent } from '../create-transaction-button/create-transaction-button';
import { TransactionItemComponent } from '../item/transaction-item';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  templateUrl: './transaction-list.html',
  imports: [
    TransactionItemComponent,
    CommonModule,
    CreateTransactionButtonComponent,
  ],
})
export class TransactionListComponent implements OnInit {
  private transactionsService = inject(TransactionsService);

  title = input('');

  public transactions$!: Observable<TransactionType[]>;

  ngOnInit() {
    this.transactions$ = this.transactionsService.transactions$;
  }
}
