import { Component, ViewChild } from "@angular/core";
import { AppService } from "../../Core/Services/app.service";
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { Config } from "datatables.net";
import { ColumnMode, NgxDatatableModule } from "@swimlane/ngx-datatable";
import { RouterModule } from "@angular/router";
import { PatientService } from "../../Core/Services/PatientService/patient.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-patient-list",
  standalone: true,
  imports: [DataTablesModule, CommonModule, NgxDatatableModule, RouterModule],
  templateUrl: "./patient-list.component.html",
  styleUrl: "./patient-list.component.css",
})
export class PatientListComponent {
  patients$!: any;
  errors: any;
  constructor(
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.appService.getPatients$.subscribe((data) => (this.patients$ = data));
  }

  deletePatient(id: any) {
    this.patientService.deletePatient(Number(id)).subscribe(
      (data) => {
        console.log(data);

        this.appService.setPatients$(data);

        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          "patient successful deleted ",
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
      }
    );
  }
}
