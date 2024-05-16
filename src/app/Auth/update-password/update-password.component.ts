import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Shared/Elements/help-link/help-link.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonModule } from "@angular/common";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { AuthService } from "../../Core/Services/AuthService/auth.service";
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from "../Helpers/utils.service";

@Component({
  selector: "app-update-password",
  standalone: true,
  imports: [HelpLinkComponent, ReactiveFormsModule, CommonModule],
  templateUrl: "./update-password.component.html",
  styleUrl: "./update-password.component.css",
})
export class UpdatePasswordComponent {
  updateForm!: FormGroup;
  showConfirmPassword: any;
  showPassword: any;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.updateForm = this.formBuilder.group({
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(e: Event) {
    this.errors = this.handleErrors.handleError({});
    this.spinner.show();
    if (this.updateForm.valid) {
      this.authService
        .updatePassword(
          this.utils.getDecodedAccessToken(
            this.route.snapshot.paramMap.get("token")
          ).userId,
          this.updateForm.value.password,
          this.updateForm.value.confirmPassword
        )
        .subscribe(
          (data) => {
            console.log(data);
            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(data.message, "success", false);
          },
          (err) => {
            this.errors = this.handleErrors.handleError(err);
            this.spinner.hide();
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
