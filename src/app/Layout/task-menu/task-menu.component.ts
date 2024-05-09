import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-task-menu",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./task-menu.component.html",
  styleUrl: "./task-menu.component.css",
})
export class TaskMenuComponent {
  @Input() action!: any;
}
