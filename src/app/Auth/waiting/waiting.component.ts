import { Component } from "@angular/core";
import { BackHomeComponent } from "../../Shared/Elements/back-home/back-home.component";

@Component({
  selector: "app-waiting",
  standalone: true,
  imports: [BackHomeComponent],
  templateUrl: "./waiting.component.html",
  styleUrl: "./waiting.component.css",
})
export class WaitingComponent {}
