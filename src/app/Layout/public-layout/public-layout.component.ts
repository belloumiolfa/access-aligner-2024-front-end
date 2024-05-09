import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CompanyDetailsComponent } from "../../Auth/company-details/company-details.component";

@Component({
  selector: "app-public-layout",
  standalone: true,
  imports: [RouterModule, CompanyDetailsComponent,],
  templateUrl: "./public-layout.component.html",
  styleUrl: "./public-layout.component.css",
})
export class PublicLayoutComponent {}
