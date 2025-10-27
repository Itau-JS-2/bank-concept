import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-navigation',
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './navigation.html',
})
export class NavigationComponent {
  navbarOpen = false;
}
