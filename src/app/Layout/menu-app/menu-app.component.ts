import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-menu-app",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./menu-app.component.html",
  styleUrl: "./menu-app.component.css",
})
export class MenuAppComponent {
  @Input() action!: any; 
}
