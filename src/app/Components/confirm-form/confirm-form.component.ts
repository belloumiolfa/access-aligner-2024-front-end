import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { CommonModule } from "@angular/common";
import { User } from "../../Core/Models/user.models";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { AuthService } from "../../Core/Services/AuthService/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-confirm-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./confirm-form.component.html",
  styleUrl: "./confirm-form.component.css",
})
export class ConfirmFormComponent {
  @Input() user!: User;
  @Output() updatedUser$ = new EventEmitter<any>();

  confirmForm!: FormGroup;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.confirmForm = this.formBuilder.group({
      term: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(statusId: number, userId: any) {
    this.errors = this.handleErrors.handleError({});
    this.spinner.show();
    this.authService.updateStatus(userId, statusId, null).subscribe(
      (data) => {
        this.spinner.hide();
        let title =
          statusId == 1
            ? "You have successfully confirmed your account. "
            : "You've successfully deactivated your account. ";

        this.handleAlerts.handleSweetAlert(title, "success", false);
      },
      (err) => {
        this.errors = this.handleErrors.handleError(err);
        this.spinner.hide();

        this.handleAlerts.handleSweetAlert(
          this.errors.status,
          "warning",
          false
        );
      }
    );
  }
}
