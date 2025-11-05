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
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
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

    this.form = this.fb.group(
      {
        name: [initialValues?.name || '', Validators.required],
        value: [initialValues?.value || null, Validators.min(0.01)],
        categoryId: [initialValues?.categoryId, Validators.required],
        paymentType: [initialValues?.paymentType || null, Validators.required],
        date: [this.formatDate(initialValues?.date), Validators.required],
      },
      { updateOn: 'blur' }
    );
  }

  private requiredSelection(control: AbstractControl): ValidationErrors | null {
    console.log(control.value, typeof control.value);
    if (control.value === null || control.value === 0) {
      return { requiredSelection: true };
    }
    return null;
  }

  private categoryIdRequiredValidor(control: { value: string }) {
    return control.value === null || control.value === undefined ? true : false;
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    this.submitForm.emit(this.form.value);
    this.form.reset();
  }
}

/* export function forbiddenNameValidator(
  categoryId: TransactionType['categoryId']
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = categoryId.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
} */
