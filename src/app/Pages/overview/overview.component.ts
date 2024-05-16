import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppService } from "../../Core/Services/app.service";
import { User } from "../../Core/Models/user.models";
import { getDate, getTime } from "../../Core/Helpers/utils";

@Component({
  selector: "app-overview",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.css",
})
export class OverviewComponent {
  user$!: User;
  count = {
    countTo: 100,
    from: 0,
    duration: 1,
  };

  constructor(private appService: AppService) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }
  getDate(date: any) {
    return getDate(date);
  }
  getTime(date: any) {
    return getTime(date);
  }
}
