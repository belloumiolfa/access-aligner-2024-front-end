import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HelpLinkComponent } from "../../Shared/Elements/help-link/help-link.component";
import { CommonModule } from "@angular/common";
import { UserService } from "../../Core/Services/user.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { UtilsService } from "../Helpers/utils.service";
import { AcceptDecisionComponent } from "../../Components/accept-decision/accept-decision.component";
import { AcceptFormComponent } from "../../Components/accept-form/accept-form.component";
import { NewUserDetailsComponent } from "../../Components/new-user-details/new-user-details.component";

@Component({
  selector: "app-admin-decision",
  standalone: true,
  imports: [
    CommonModule,
    HelpLinkComponent,
    AcceptDecisionComponent,
    AcceptFormComponent,
    NewUserDetailsComponent,
  ],
  templateUrl: "./admin-decision.component.html",
  styleUrl: "./admin-decision.component.css",
})
export class AdminDecisionComponent {
  user$!: any;
  errors!: any;
  admin = this.utils.getDecodedAccessToken(
    this.route.snapshot.paramMap.get("token")
  ).userId;
  user = this.route.snapshot.paramMap.get("user");
  constructor(
    private utils: UtilsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private handleErrors: HandleErrorsService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.getUserById(this.user).subscribe(
      (data) => {
        this.user$ = data;
      },
      (err) => {
        this.errors = this.handleErrors.handleError(err);
      }
    );
    console.log(this.user$);
  }
}
