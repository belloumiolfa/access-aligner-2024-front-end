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
  user$!: any;
  profilePhoto$!: any;
  constructor(
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.appService.getPatients$.subscribe((data) => (this.patients$ = data));
    // privisoire until fixe the rest of the logic
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
    this.appService.getPhoto$.subscribe((data) => (this.profilePhoto$ = data));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  getPatients() {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setPatients$(data);
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      }
    );
  }

  deletePatient(id: any) {
    console.log("delete:", id);
    this.patientService.deletePatient(Number(id)).subscribe(
      (data) => {
        // get patiens an other once
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(data.message, "success", false);
        this.getPatients();
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
