import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PatientInfosComponent } from "../../Components/patient-infos/patient-infos.component";
import { PatientFormComponent } from "../../Components/patient-form/patient-form.component";
import { AppService } from "../../Core/Services/app.service";
import { PatientService } from "../../Core/Services/PatientService/patient.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { PatientUpdateFormComponent } from "../../Components/patient-update-form/patient-update-form.component";

@Component({
  selector: "app-update-patient",
  standalone: true,
  imports: [
    PatientInfosComponent,
    PatientFormComponent,
    PatientUpdateFormComponent,
  ],
  templateUrl: "./update-patient.component.html",
  styleUrl: "./update-patient.component.css",
})
export class UpdatePatientComponent {
  id!: number;
  errors: any;
  patient$!: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.activeRoute.params.subscribe((params) => (this.id = params["id"]));
    this.appService.getPatient$.subscribe((data) => (this.patient$ = data));
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.patientService.getPatient(this.id).subscribe(
      (data) => {
        this.spinner.hide();
        this.appService.setPatient$(data);
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      }
    );
  }
}
