import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AppService } from "../../Core/Services/app.service";
import { User } from "../../Core/Models/user.models";
import { UserService } from "../../Core/Services/UserService/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { log } from "console";
import { getDate } from "../../Core/Helpers/utils";

@Component({
  selector: "app-account-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./account-form.component.html",
  styleUrl: "./account-form.component.css",
})
export class AccountFormComponent {
  profileForm!: FormGroup<any>;
  user$!: User;
  errors: any;
  birthDate!: any;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService
  ) {
    this.appService.getUser$.subscribe((data) => {
      this.user$ = data;
      this.birthDate = getDate(new Date(this.user$.profile?.dateOfBirth));

      this.profileForm = this.formBuilder.group({
        firstName: new FormControl(this.user$.profile?.firstName, []),
        lastName: new FormControl(this.user$.profile?.lastName, []),
        dateOfBirth: new FormControl(this.user$.profile?.dateOfBirth, []),
        description: new FormControl(this.user$.profile?.description, []),
        phone: new FormControl(this.user$.profile?.phone, []),
        mobile: new FormControl(this.user$.profile?.mobile, []),
        address: new FormControl(this.user$.profile?.address, []),
      });
    });
  }
  getDate(date: any) {
    return getDate(new Date(date));
  }

  onSubmit($event: any) {
    this.errors = this.handleErrors.handleError({});

    if (this.profileForm.valid) {
      this.spinner.show();
      this.userService
        .updateProfile(this.profileForm.value, this.user$.id)
        .subscribe(
          (data) => {
            //update profile in user :*
            this.appService.setUser$({ ...this.user$, profile: data });

            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(
              "Account setting successfully updated",
              "success",
              false
            );
          },
          (err) => {
            console.log(err);
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
