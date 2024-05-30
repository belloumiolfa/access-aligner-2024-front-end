import { Component } from "@angular/core";
import { PatientInfosComponent } from "../../Components/patient-infos/patient-infos.component";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { getDate } from "../../Core/Helpers/utils";
import { PatientService } from "../../Core/Services/PatientService/patient.service";
import { AppService } from "../../Core/Services/app.service";
import { data } from "jquery";

@Component({
  selector: "app-patient-detail",
  standalone: true,
  imports: [PatientInfosComponent],
  templateUrl: "./patient-detail.component.html",
  styleUrl: "./patient-detail.component.css",
})
export class PatientDetailComponent {
  id!: any;
  errors!: any;
  patient$!: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private patientService: PatientService,
    private spinner: NgxSpinnerService,
    private handleErrors: HandleErrorsService,
    private appService: AppService
  ) {
    this.activeRoute.params.subscribe((params) => (this.id = params["id"]));
    this.appService.getPatient$.subscribe((data) => (this.patient$ = data));
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
 
    this.patientService.getPatient(Number(this.id)).subscribe(
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
