import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../shared/navigation/navigation';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './layout.html',
})
export class LayoutComponent {}
