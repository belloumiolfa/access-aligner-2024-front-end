import { Component } from "@angular/core";
import { environment } from "../../../../environments/environment.development";

@Component({
  selector: "app-help-link",
  standalone: true,
  imports: [],
  templateUrl: "./help-link.component.html",
  styleUrl: "./help-link.component.css",
})
export class HelpLinkComponent {
  domain: String = environment.domainName;
}
