import { Component } from "@angular/core";
import { BackHomeComponent } from "../../Shared/Elements/back-home/back-home.component";
import { HelpLinkComponent } from "../../Shared/Elements/help-link/help-link.component";
import { CompanyDetailsComponent } from "../company-details/company-details.component";
import { environment } from "../../../environments/environment.development";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from "../Helpers/utils.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { ConfirmFormComponent } from "../../Components/confirm-form/confirm-form.component";
import { ConfirmDecisionComponent } from "../../Components/confirm-decision/confirm-decision.component";
import { AuthService } from "../../Core/Services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-confirmation",
  standalone: true,
  imports: [
    BackHomeComponent,
    HelpLinkComponent,
    CompanyDetailsComponent,
    CommonModule,
    ReactiveFormsModule,
    ConfirmFormComponent,
    ConfirmDecisionComponent,
  ],
  templateUrl: "./confirmation.component.html",
  styleUrl: "./confirmation.component.css",
})
export class ConfirmationComponent {
  name = environment.companyName;
  user$!: any;
  confirmForm!: FormGroup;
  errors: any;

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // decode token
    this.spinner.show();
    this.authService
      .getUserById(
        this.utils.getDecodedAccessToken(
          this.route.snapshot.paramMap.get("token")
        ).userId
      )
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.user$ = data;
        },
        (err) => {
          this.spinner.hide();
          this.errors = this.handleErrors.handleError(err);
        }
      );
    console.log(this.user$);
  }
  onChangeUser(event$: any) {
    this.user$ = event$;
  }
}
