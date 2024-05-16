import { Component } from '@angular/core';
import { SecurityFormComponent } from '../../Components/security-form/security-form.component';
import { PhotoFormComponent } from '../../Components/photo-form/photo-form.component';
import { AccountFormComponent } from '../../Components/account-form/account-form.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SecurityFormComponent,PhotoFormComponent,AccountFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
