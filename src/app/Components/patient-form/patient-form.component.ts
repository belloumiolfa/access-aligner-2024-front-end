import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { PatientService } from "../../Core/Services/PatientService/patient.service";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from "../../Core/Services/app.service";

@Component({
  selector: "app-patient-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./patient-form.component.html",
  styleUrl: "./patient-form.component.css",
})
export class PatientFormComponent {
  patientForm!: FormGroup<any>;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.patientForm = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required]),
      sex: new FormControl("", []),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      profession: new FormControl("", []),
      address: new FormControl("", []),
      comment: new FormControl("", []),
    });
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

  onSubmit(e: any) {
    this.errors = this.handleErrors.handleError({});

    if (this.patientForm.valid)
      this.patientService.addPatient(this.patientForm.value).subscribe(
        (data) => {
          this.spinner.hide();
          this.handleAlerts.handleSweetAlert(
            "Patient successfully Added!",
            "success",
            false
          );
          this.patientForm.reset();
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
