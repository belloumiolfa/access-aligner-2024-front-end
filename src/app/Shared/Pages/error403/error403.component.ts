import { Component } from '@angular/core';
import { HelpLinkComponent } from '../../Elements/help-link/help-link.component';
import { BackHomeComponent } from '../../Elements/back-home/back-home.component';

@Component({
  selector: 'app-error403',
  standalone: true,
  imports: [HelpLinkComponent, BackHomeComponent],
  templateUrl: './error403.component.html',
  styleUrl: './error403.component.css'
})
export class Error403Component {

}
