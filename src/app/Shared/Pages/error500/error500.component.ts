import { Component } from '@angular/core';
import { BackHomeComponent } from '../../Elements/back-home/back-home.component';
import { HelpLinkComponent } from '../../Elements/help-link/help-link.component';

@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [BackHomeComponent,HelpLinkComponent],
  templateUrl: './error500.component.html',
  styleUrl: './error500.component.css'
})
export class Error500Component {

}
