import { Component } from "@angular/core";
import { AppService } from "../../Core/Services/app.service";
import { User } from "../../Core/Models/user.models";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet } from "@angular/router";
import { NgCircleProgressModule } from "ng-circle-progress";
import { BaseChartDirective } from "ng2-charts";
import { BlockHeaderComponent } from "../../Shared/Elements/block-header/block-header.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NgCircleProgressModule,
    BaseChartDirective,
    BlockHeaderComponent,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  user$!: User;
  profilePhoto$!: any;
  clickedIndex = 0;

  constructor(private appService: AppService) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
    this.appService.getPhoto$.subscribe((data) => (this.profilePhoto$ = data));
    console.log(this.profilePhoto$);
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
  verifyProfilePhoto(photo: any) {
    if (Object.keys(photo).length > 0) return photo;
    else return "assets/images/profile_av.png";
  }
}
