import { Component } from '@angular/core';
import { HelpLinkComponent } from '../../Elements/help-link/help-link.component';
import { BackHomeComponent } from '../../Elements/back-home/back-home.component';

@Component({
  selector: 'app-error503',
  standalone: true,
  imports: [HelpLinkComponent,BackHomeComponent],
  templateUrl: './error503.component.html',
  styleUrl: './error503.component.css'
})
export class Error503Component {

}
