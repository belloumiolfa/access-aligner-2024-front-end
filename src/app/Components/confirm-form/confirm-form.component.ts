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
import { UserService } from "../../Core/Services/user.service";
import Swal from "sweetalert2";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";

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
    private userService: UserService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService
  ) {
    this.confirmForm = this.formBuilder.group({
      term: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(statusId: number, userId: any) {
    this.errors = this.handleErrors.handleError({});

    this.userService.updateStatus(userId, statusId, null).subscribe(
      (data) => {
        let title =
          statusId == 1
            ? "You have successfully confirmed your account. "
            : "You've successfully deactivated your account. ";

        this.handleAlerts.handleSweetAlert(title, "success", false);

        // emit updated user
        // this.updatedUser$.emit(data);
      },
      (err) => {
        this.errors = this.handleErrors.handleError(err);
        this.handleAlerts.handleSweetAlert(
          this.errors.status,
          "warning",
          false
        );
      }
    );
  }
}
