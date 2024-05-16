import { Component } from "@angular/core";
import { AppService } from "../../Core/Services/app.service";
import { User } from "../../Core/Models/user.models";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet } from "@angular/router";
import { NgCircleProgressModule } from "ng-circle-progress";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NgCircleProgressModule,
    BaseChartDirective,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  user$!: User;
  clickedIndex = 0;

  constructor(private appService: AppService) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }
  chartAreaData = [
    { y: "2006", a: 100, b: 90 },
    { y: "2007", a: 75, b: 65 },
    { y: "2008", a: 50, b: 40 },
    { y: "2009", a: 75, b: 65 },
    { y: "2010", a: 50, b: 40 },
    { y: "2011", a: 75, b: 65 },
    { y: "2012", a: 100, b: 90 },
  ];
  chartAreaOptions = {};
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  CircleProgressOptions = {};
}