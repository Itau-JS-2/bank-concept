import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  standalone: true,
})
export class ButtonComponent {
  variant = input<'default' | 'subtle'>('default');
  ariaLabel = input<string>('');
  leftSection = input<TemplateRef<any> | null>(null);
  rightSection = input<TemplateRef<any> | null>(null);
  tooltip = input<string>('');
  className = input<string>('');
}
