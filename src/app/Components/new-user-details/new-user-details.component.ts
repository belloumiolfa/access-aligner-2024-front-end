import { Component, Input } from "@angular/core";

@Component({
  selector: "app-new-user-details",
  standalone: true,
  imports: [],
  templateUrl: "./new-user-details.component.html",
  styleUrl: "./new-user-details.component.css",
})
export class NewUserDetailsComponent {
  getDate(date: any) {
    return (
      new Date(date).getUTCDate() +
      "/" +
      new Date(date).getUTCMonth() +
      "/" +
      new Date(date).getUTCFullYear()
    );
  }
  getTime(date: any) {
    return new Date(date).getHours() + ":" + new Date(date).getMinutes();
  }
  @Input() user!: any;
}
