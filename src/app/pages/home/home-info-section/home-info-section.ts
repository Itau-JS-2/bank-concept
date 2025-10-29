import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from '../../../shared/tabs/tabs';

@Component({
  selector: 'app-home-info-section',
  imports: [FormsModule, CommonModule, TabsComponent],
  templateUrl: './home-info-section.html',
})
export class HomeInfoSectionComponent {
  tabData = [
    { text: 'Lançamentos', value: 'releases' },
    { text: 'Despesas', value: 'expenses' },
    { text: 'Taxas', value: 'taxes' },
  ];

  selectData = [
    { name: 'Dia', value: 'day' },
    { name: 'Mês', value: 'month' },
    { name: 'Ano', value: 'year' },
  ];

  activeTab = this.tabData[1].value;
  activeSelectData = this.selectData[0].value;

  setActiveTab(value: string) {
    this.activeTab = value;
  }
}
