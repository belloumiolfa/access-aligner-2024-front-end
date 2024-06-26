import { Component } from '@angular/core';
import { BackHomeComponent } from "../../Elements/back-home/back-home.component";
import { HelpLinkComponent } from "../../Elements/help-link/help-link.component";
import { BlockHeaderComponent } from "../../Elements/block-header/block-header.component";
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../Elements/logo/logo.component';

@Component({
    selector: 'app-coming-page',
    standalone: true,
    templateUrl: './coming-page.component.html',
    styleUrl: './coming-page.component.css',
    imports: [BackHomeComponent, HelpLinkComponent, BlockHeaderComponent, RouterOutlet, LogoComponent]
})
export class ComingPageComponent {

}
