import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../../../../shared/button/button';
import {
  CategoriesService,
  CategoryType,
} from '../../../../categories/categories.service';
import { PAYMENT_METHODS } from '../../../services';
import {
  TransactionFormType,
  TransactionType,
} from '../../../services/transactions.service';

@Component({
  selector: 'app-default-transaction-form',
  standalone: true,
  templateUrl: './default-transaction-form.html',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
})
export class DefaultTransactionFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);

  defaultValues = input<TransactionType | undefined>(undefined);
  submitForm = output<TransactionFormType>();

  form!: FormGroup;
  categories$!: Observable<CategoryType[]>;
  paymentMethods = PAYMENT_METHODS;

  ngOnInit(): void {
    this.categories$ = this.categoriesService.categories$;
    const initialValues = this.defaultValues();

    this.form = this.fb.group({
      name: [initialValues?.name || '', Validators.required],
      value: [initialValues?.value || null, Validators.min(0.01)],
      categoryId: [initialValues?.categoryId || null, Validators.required],
      paymentType: [initialValues?.paymentType || null, Validators.required],
      date: [this.formatDate(initialValues?.date), Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['defaultValues'] && this.form) {
      const v = this.defaultValues();

      if (v) {
        this.patchForm(v);
      } else if (changes['defaultValues'].firstChange === false) {
        this.form.reset();
      }
    }
  }

  private formatDate(date: Date | undefined): string {
    const d = date ? new Date(date) : new Date();
    return d.toISOString().substring(0, 10);
  }

  private patchForm(v: TransactionType) {
    this.form.patchValue({
      ...v,
      date: this.formatDate(v.date),
    });
  }

  onSubmit() {
    console.log(this.form.value);

    this.submitForm.emit(this.form.value);
    this.form.reset();
  }
}
