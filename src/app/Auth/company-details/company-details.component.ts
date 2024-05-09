import { Component, Input } from "@angular/core";
import { LogoComponent } from "../../Shared/Elements/logo/logo.component";
import { LinksComponent } from "../../Shared/Elements/links/links.component";
import { environment } from "../../../environments/environment.development";

@Component({
  selector: "app-company-details",
  standalone: true,
  imports: [LogoComponent, LinksComponent],
  templateUrl: "./company-details.component.html",
  styleUrl: "./company-details.component.css",
})
export class CompanyDetailsComponent {
  @Input() title = environment.companyName;
  @Input() subTitle = "The ultimate  invisible dental   aligner";
  @Input() description =
    "    In the creation of its invisible orthodontic aligners, " +
    environment.companyName +
    " is constantly seeking performance and innovation.";
}
