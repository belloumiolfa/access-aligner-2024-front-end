import { Component, Input } from "@angular/core";
import { getDate, getTime } from "../../Core/Helpers/utils";

@Component({
  selector: "app-new-user-details",
  standalone: true,
  imports: [],
  templateUrl: "./new-user-details.component.html",
  styleUrl: "./new-user-details.component.css",
})
export class NewUserDetailsComponent {
  getDate(date: any) {
    return getDate(date)
  }
  getTime(date: any) {
    return getTime(date)
  }
  @Input() user!: any;
}
