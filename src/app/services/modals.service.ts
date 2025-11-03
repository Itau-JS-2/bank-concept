import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TransactionType } from '../features/transactions/services/transactions.service';

export type ModalProps = {
  name: ModalName;
  open: boolean;
  dataId?: number | string | null;
};

export enum ModalName {
  CREATE_TRANSACTION = 'create-transaction',
  UPDATE_TRANSACTION = 'update-transaction',
  CREATE_CATEGORY = 'create-category',
  UPDATE_CATEGORY = 'update-category',
}

const DEFAULT_MODALS: ModalProps[] = [
  { name: ModalName.CREATE_TRANSACTION, open: false },
  { name: ModalName.UPDATE_TRANSACTION, open: false, dataId: null },
  { name: ModalName.CREATE_CATEGORY, open: false },
  { name: ModalName.UPDATE_CATEGORY, open: false, dataId: null },
];

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  private modalsSubject = new BehaviorSubject<ModalProps[]>(DEFAULT_MODALS);
  modals$: Observable<ModalProps[]> = this.modalsSubject.asObservable();

  open(name: ModalName) {
    const newModals = this.modalsSubject
      .getValue()
      .map((modal) =>
        modal.name === name
          ? { ...modal, open: true }
          : { ...modal, open: false, dataId: null }
      );

    this.modalsSubject.next(newModals);
  }

  close(name: ModalName) {
    const newModals = this.modalsSubject
      .getValue()
      .map((modal) =>
        modal.name === name ? { ...modal, open: false, dataId: null } : modal
      );

    this.modalsSubject.next(newModals);
  }

  openUpdate(name: ModalName, dataId: TransactionType['id']) {
    const newModals = this.modalsSubject.getValue().map((modal) =>
      modal.name === name
        ? {
            ...modal,
            open: true,
            dataId,
          }
        : { ...modal, open: false, dataId: null }
    );

    this.modalsSubject.next(newModals);
  }

  getModal$(name: ModalName) {
    return this.modals$.pipe(
      map((modals) => modals.find((m) => m.name === name))
    );
  }
}
