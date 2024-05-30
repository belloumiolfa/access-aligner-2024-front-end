import { Component } from "@angular/core";
import { BlockHeaderComponent } from "../../Shared/Elements/block-header/block-header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-treatment",
  standalone: true,
  imports: [RouterOutlet, BlockHeaderComponent],
  templateUrl: "./treatment.component.html",
  styleUrl: "./treatment.component.css",
})
export class TreatmentComponent {}
