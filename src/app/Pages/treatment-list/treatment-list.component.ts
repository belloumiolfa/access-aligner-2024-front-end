import { Component } from "@angular/core";
import { TreatmentService } from "../../Core/Services/TreatService/treatment.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { AppService } from "../../Core/Services/app.service";
import Swal from "sweetalert2";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DataTablesModule } from "angular-datatables";

@Component({
  selector: "app-treatment-list",
  standalone: true,
  imports: [
    DataTablesModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: "./treatment-list.component.html",
  styleUrl: "./treatment-list.component.css",
})
export class TreatmentListComponent {
  getTreatmentType(treat: any) {
    switch (treat) {
      case "lower-arch":
        return "Lower arch";
      case "upper-arch":
        return "Upper arch";

      case "upper-lower":
        return "Upper & Lower arch";

      default:
        return "Nothing has been added yet.";
    }
  }
  calculateCompletionPercentage(dataObject: any) {
    let totalFields = 0;
    let completedFields = 0;

    for (let key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        totalFields++;

        // Define your completion criteria here
        // For example, if you consider a field completed if it's not null, undefined, or an empty string:
        if (key === "photos" || key === "clinics") {
          if (dataObject["photos"] === 10) completedFields++;
          if (dataObject["clinics"] === 4) completedFields++;
        } else {
          if (
          
            dataObject[key] !== null &&
            dataObject[key] !== undefined &&
            dataObject[key] !== ""
          ) {
            completedFields++;
          }
        }
      }
    }

    // Calculate percentage
    if (totalFields === 0) {
      return 0; // Avoid division by zero
    } else {
      return (completedFields / totalFields) * 100;
    }
  }
  treatments$!: any;
  searchTerm: string = "";
  treatmentsBeforeFilter!: any;
  filter: boolean = false;

  constructor(
    private treatmentService: TreatmentService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.appService.getTreatments$.subscribe((data) => {
      this.treatments$ = data;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("TREATMENT = ", this.treatments$);
  }

  deleteTreatment(id: any) {
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
        // delete treatment service
      }
    });
  }

  serachByName() {
    if (this.searchTerm.trim() !== "") {
      this.filter = true;

      this.treatments$ = this.treatmentsBeforeFilter.filter(
        (treatment: any) =>
          (treatment.patient.firstName &&
            treatment.patient.firstName.includes(this.searchTerm)) ||
          (treatment.patient.lastName &&
            treatment.patient.lastName.includes(this.searchTerm)) ||
          (
            treatment.patient.firstName +
            " " +
            treatment.patient.lastName
          ).includes(this.searchTerm)
      );
    } else {
      this.treatments$ = this.treatmentsBeforeFilter;
      this.filter = false;
    }
  }
}
