import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-rigth-sidebar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./rigth-sidebar.component.html",
  styleUrl: "./rigth-sidebar.component.css",
})
export class RigthSidebarComponent {
  @Input() action!: any;
  actSet: any = true;
}
