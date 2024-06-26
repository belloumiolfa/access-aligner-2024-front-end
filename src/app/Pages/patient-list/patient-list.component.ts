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
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-patient-list",
  standalone: true,
  imports: [
    DataTablesModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: "./patient-list.component.html",
  styleUrl: "./patient-list.component.css",
})
export class PatientListComponent {
  patients$!: any;
  patientsBeforeFilter$!: any;
  filter: boolean = false;
  errors: any;
  searchTerm: string = "";
  constructor(
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.appService.getPatients$.subscribe((data) => {
      this.patients$ = data;
      this.patientsBeforeFilter$ = this.patients$;
    });
  }

  deletePatient(id: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonColor: "#b9b9b9",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "sweet-alert", // corrected class name
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.deletePatient(Number(id)).subscribe(
          (data) => {
            console.log(data);

            this.appService.setPatients$(data);
           
            this.handleAlerts.handleSweetAlert(
              "Your patient has been deleted.",
              "success",
              false
            );
          },
          (err) => {
            this.errors = this.handleErrors.handleError(err);
            this.spinner.hide();

            console.log("errors ", this.errors);
            this.handleAlerts.handleSweetAlert(
              "Check your data input carefully.",
              "error",
              false
            );
          }
        );
      }
    });
  }

  serachByName() {
    if (this.searchTerm.trim() !== "") {
      this.filter = true;

      this.patients$ = this.patientsBeforeFilter$.filter(
        (patient: {
          firstName: string | string[];
          lastName: string | string[];
        }) =>
          (patient.firstName && patient.firstName.includes(this.searchTerm)) ||
          (patient.lastName && patient.lastName.includes(this.searchTerm)) ||
          (patient.firstName + " " + patient.lastName).includes(this.searchTerm)
      );
    } else {
      this.patients$ = this.patientsBeforeFilter$;
      this.filter = false;
    }

  }
}
