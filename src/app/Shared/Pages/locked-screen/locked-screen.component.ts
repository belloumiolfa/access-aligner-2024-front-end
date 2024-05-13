import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Elements/help-link/help-link.component";
import { BackHomeComponent } from "../../Elements/back-home/back-home.component";

@Component({
  selector: "app-locked-screen",
  standalone: true,
  imports: [HelpLinkComponent, BackHomeComponent],
  templateUrl: "./locked-screen.component.html",
  styleUrl: "./locked-screen.component.css",
})
export class LockedScreenComponent {}
