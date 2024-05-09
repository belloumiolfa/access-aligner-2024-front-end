import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-accept-decision",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./accept-decision.component.html",
  styleUrl: "./accept-decision.component.css",
})
export class AcceptDecisionComponent {
  @Input() user!: any;
}
