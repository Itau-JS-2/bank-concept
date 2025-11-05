import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconTrash } from 'angular-tabler-icons/icons';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import {
  ModalName,
  ModalsService,
} from '../../../../../services/modals.service';
import { ModalsComponent } from '../../../../../shared/modals/modal/modal';
import { dateFromLocalString } from '../../../../../shared/utils/dates';
import {
  TransactionFormType,
  TransactionsService,
  TransactionType,
} from '../../../services/transactions.service';

@Component({
  selector: 'app-update-transaction-modal',
  standalone: true,
  imports: [TablerIconComponent, CommonModule, ModalsComponent],
  providers: [
    provideTablerIcons({
      IconTrash,
    }),
  ],
  templateUrl: './update-transaction-modal.html',
})
export class UpdateTransactionModalComponent implements OnDestroy {
  private modalsService = inject(ModalsService);
  private transactionService = inject(TransactionsService);

  readonly modalName = ModalName.UPDATE_TRANSACTION;

  public transaction$!: Observable<TransactionType | undefined>;

  private currentDataId: string | null = null;

  private dataIdSubscription: Subscription;

  constructor() {
    const modalId$ = this.modalsService
      .getModal$(this.modalName)
      .pipe(map((modal) => modal?.dataId?.toString() ?? null));

    this.dataIdSubscription = modalId$.subscribe((id) => {
      this.currentDataId = id;
    });

    this.transaction$ = modalId$.pipe(
      switchMap((id) =>
        this.transactionService.transactions$.pipe(
          map((transactions) =>
            id ? transactions.find((t) => t.id === id) : undefined
          )
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.dataIdSubscription.unsubscribe();
  }

  onSubmit(data: TransactionFormType): void {
    if (this.currentDataId) {
      this.transactionService.update(
        {
          ...data,
          categoryId: Number(data.categoryId),
          date: dateFromLocalString(data.date as any),
        },
        this.currentDataId
      );
    }
  }

  delete(): void {
    if (this.currentDataId) {
      this.transactionService.delete(this.currentDataId);
      this.modalsService.close(this.modalName);
    }
  }

  onClose() {
    this.modalsService.close(this.modalName);
  }
}
