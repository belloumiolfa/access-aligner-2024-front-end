import { Component } from "@angular/core";
import { BlockHeaderComponent } from "../../Shared/Elements/block-header/block-header.component";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PatientService } from "../../Core/Services/PatientService/patient.service";
import { AppService } from "../../Core/Services/app.service";
import { NgxSpinnerService, Spinner } from "ngx-spinner";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";

@Component({
  selector: "app-patient",
  standalone: true,
  imports: [BlockHeaderComponent, RouterOutlet, RouterModule, CommonModule],
  templateUrl: "./patient.component.html",
  styleUrl: "./patient.component.css",
})
export class PatientComponent {
  clickedIndex = 1;
  errors!: any;

  constructor(
    private patientService: PatientService,
    private appService: AppService,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService
  ) {
    this.spinner.show();
    this.patientService.getPatients().subscribe(
      (data) => {
        this.appService.setPatients$(data);
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      }
    );
  }
}
