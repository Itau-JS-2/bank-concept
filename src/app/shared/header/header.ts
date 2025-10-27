import { Component, EventEmitter, Output } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconMenu2 } from 'angular-tabler-icons/icons';

@Component({
  selector: 'app-header',
  imports: [TablerIconComponent],
  templateUrl: './header.html',
  providers: [
    provideTablerIcons({
      IconMenu2,
    }),
  ],
})
export class HeaderComponent {
  @Output() setOpened = new EventEmitter<boolean>();

  openMenu(): void {
    this.setOpened.emit(true);
  }
}
