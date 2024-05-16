import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "../../Core/Services/UserService/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { signInUser } from "../../Core/Helpers/utils";
import { first } from "rxjs";

@Component({
  selector: "app-security-form",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./security-form.component.html",
  styleUrl: "./security-form.component.css",
})
export class SecurityFormComponent {
  securityForm!: FormGroup<any>;
  errors: any = {};
  showCurrentPassword: any;
  showNewPassword: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.securityForm = this.formBuilder.group({
      userName: new FormControl("", [Validators.required]),
      currentPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
    });
  }

  onSubmit($event: any) {
    console.log(this.securityForm.value);
    this.errors = this.handleErrors.handleError({});
    this.spinner.show();

    if (this.securityForm.valid) {
      this.userService
        .updateSetting(
          this.securityForm.value.userName,
          this.securityForm.value.currentPassword,
          this.securityForm.value.newPassword
        )
        .pipe(first())
        .subscribe(
          (data) => {
            console.log(data);

            signInUser(data.accessToken, false);
            this.spinner.hide();

            this.handleAlerts.handleSweetAlert(
              "Password Updated ",
              "success",
              false
            );
          },
          (err) => {
            this.errors = this.handleErrors.handleError(err);
            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(
              "Check your data input carefully.",
              "error",
              false
            );
            console.log(this.errors);
          }
        );
    }
  }
}
