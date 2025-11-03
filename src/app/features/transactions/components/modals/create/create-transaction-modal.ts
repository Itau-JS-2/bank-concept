import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ModalName,
  ModalsService,
} from '../../../../../services/modals.service';
import { ModalsComponent } from '../../../../../shared/modals/modal/modal';
import { dateFromLocalString } from '../../../../../shared/utils/dates';
import {
  TransactionFormType,
  TransactionsService,
} from '../../../services/transactions.service';

@Component({
  selector: 'app-create-transaction-modal',
  standalone: true,
  imports: [CommonModule, ModalsComponent],
  templateUrl: './create-transaction-modal.html',
})
export class CreateTransactionModalComponent {
  private modalsService = inject(ModalsService);
  private transactionService = inject(TransactionsService);

  readonly modalName = ModalName.CREATE_TRANSACTION;

  onSubmit(data: TransactionFormType): void {
    console.log(data);

    this.transactionService.create({
      ...data,
      categoryId: Number(data.categoryId),
      date: dateFromLocalString(data.date as any),
    });

    this.modalsService.close(this.modalName);
  }

  onClose(): void {
    this.modalsService.close(this.modalName);
  }
}
