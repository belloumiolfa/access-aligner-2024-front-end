import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Shared/Elements/help-link/help-link.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../Core/Services/auth.service";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";

@Component({
  selector: "app-forget-password",
  standalone: true,
  imports: [HelpLinkComponent, ReactiveFormsModule, CommonModule],
  templateUrl: "./forget-password.component.html",
  styleUrl: "./forget-password.component.css",
})
export class ForgetPasswordComponent {
  form!: FormGroup;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,

    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }
  onSubmit(e: Event) {
    this.spinner.show();
    //forgetPassword
    this.errors = this.handleErrors.handleError({});

    if (this.form.valid) {
      this.authService.forgetPassword(this.form.value.email).subscribe(
        (data) => {
          console.log(data);
          this.spinner.hide();
          this.handleAlerts.handleSweetAlert(data.message, "success", false);
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
          this.errors = this.handleErrors.handleError(err);

          this.handleAlerts.handleSweetAlert(
            "Check your data input carefully.",
            "error",
            false
          );
        }
      );
    }
  }
}
