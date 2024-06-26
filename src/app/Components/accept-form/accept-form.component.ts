import { Component, Input } from "@angular/core";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { AuthService } from "../../Core/Services/AuthService/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-accept-form",
  standalone: true,
  imports: [],
  templateUrl: "./accept-form.component.html",
  styleUrl: "./accept-form.component.css",
})
export class AcceptFormComponent {
  @Input() userId!: any;
  @Input() adminId!: any;

  errors: any;
  constructor(
    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit(userId: any, adminId: any, statusId: any) {
    this.errors = this.handleErrors.handleError({});
    this.spinner.show();
    this.authService.updateStatus(userId, statusId, adminId).subscribe(
      (data) => {
        this.spinner.hide();
        let title =
          statusId == 4
            ? "You have successfully Accept this account. "
            : "You've successfully Reject this account. ";

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
