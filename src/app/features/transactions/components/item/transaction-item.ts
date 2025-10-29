import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconCar,
  IconShirt,
  IconShoppingCart,
  IconToolsKitchen2,
} from 'angular-tabler-icons/icons';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { ModalName, ModalsService } from '../../../../services/modals.service';
import {
  CategoriesService,
  CategoryType,
} from '../../../categories/categories.service';
import { TransactionType } from '../../services/transactions.service';

@Component({
  standalone: true,
  selector: 'app-transaction-item',
  imports: [CommonModule, TablerIconComponent, FormatDatePipe],
  templateUrl: './transaction-item.html',
  providers: [
    provideTablerIcons({
      IconCar,
      IconShirt,
      IconToolsKitchen2,
      IconShoppingCart,
    }),
  ],
})
export class TransactionItemComponent {
  private categoriesService = inject(CategoriesService);
  private modalsService = inject(ModalsService);

  public dataSubject = new BehaviorSubject<TransactionType | null>(null);

  public category$: Observable<CategoryType | undefined>;

  @Input()
  set data(transaction: TransactionType) {
    this.dataSubject.next(transaction);
  }

  constructor() {
    this.category$ = combineLatest([
      this.categoriesService.categories$,
      this.dataSubject.pipe(
        filter((data): data is TransactionType => data !== null)
      ),
    ]).pipe(
      map(([categories, data]) => {
        return categories.find((c) => c.id === data.categoryId);
      })
    );
  }

  openUpdateTransactionModal(dataId: string) {
    this.modalsService.openUpdate(ModalName.UPDATE_TRANSACTION, dataId);
  }
}
