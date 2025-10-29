import { Component } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconUserCircle } from 'angular-tabler-icons/icons';
import { ButtonComponent } from '../../shared/button/button';
import { CreditCardComponent } from '../../shared/credit-card/credit-card';
import { HomeInfoSectionComponent } from './home-info-section/home-info-section';

@Component({
  selector: 'app-home',
  imports: [
    CreditCardComponent,
    TablerIconComponent,
    ButtonComponent,
    HomeInfoSectionComponent,
  ],
  providers: [
    provideTablerIcons({
      IconUserCircle,
    }),
  ],
  templateUrl: './home.html',
})
export class HomeComponent {}
