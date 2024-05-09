import { Component } from "@angular/core";
import { HelpLinkComponent } from "../help-link/help-link.component";
import { environment } from "../../../../environments/environment.development";

@Component({
  selector: "app-back-home",
  standalone: true,
  imports: [HelpLinkComponent],
  templateUrl: "./back-home.component.html",
  styleUrl: "./back-home.component.css",
})
export class BackHomeComponent {
  domain: String = environment.domainName;
}
