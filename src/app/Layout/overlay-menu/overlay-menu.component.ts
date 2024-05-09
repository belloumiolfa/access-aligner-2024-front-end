import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overlay-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay-menu.component.html',
  styleUrl: './overlay-menu.component.css'
})
export class OverlayMenuComponent {
@Input() action !:any 
}
