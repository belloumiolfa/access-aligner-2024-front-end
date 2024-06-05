import { Component } from '@angular/core';
import { SecurityFormComponent } from '../../Components/security-form/security-form.component';
import { PhotoFormComponent } from '../../Components/photo-form/photo-form.component';
import { AccountFormComponent } from '../../Components/account-form/account-form.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SecurityFormComponent,PhotoFormComponent,AccountFormComponent, HttpClientModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
