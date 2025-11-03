import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateTransactionModalComponent } from '../../../features/transactions/components/modals/create/create-transaction-modal';
import { UpdateTransactionModalComponent } from '../../../features/transactions/components/modals/update/update-transaction-modal';
import { ModalProps, ModalsService } from '../../../services/modals.service';

@Component({
  selector: 'app-modals-container',
  standalone: true,
  imports: [
    CommonModule,
    CreateTransactionModalComponent,
    UpdateTransactionModalComponent,
  ],
  templateUrl: './modals-container.html',
})
export class ModalsContainerComponent implements OnInit {
  private modalsService = inject(ModalsService);

  public modals$!: Observable<ModalProps[]>;

  ngOnInit(): void {
    this.modals$ = this.modalsService.modals$;
  }

  public isAnyModalOpen$: Observable<boolean> = this.modalsService.modals$.pipe(
    map((modals) => modals.some((m) => m.open))
  );
}
