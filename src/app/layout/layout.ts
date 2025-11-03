import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalsContainerComponent } from '../shared/modals/container/modals-container';
import { NavigationComponent } from '../shared/navigation/navigation';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavigationComponent, ModalsContainerComponent],
  templateUrl: './layout.html',
})
export class LayoutComponent {}
