import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { PatientService } from "../../Core/Services/PatientService/patient.service";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../../Core/Services/app.service";

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

import 'moment/locale/fr';
import {MatInputModule} from '@angular/material/input';

import {provideNativeDateAdapter} from '@angular/material/core';



@Component({
  selector: "app-patient-update-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./patient-update-form.component.html",
  styleUrl: "./patient-update-form.component.css",
})
export class PatientUpdateFormComponent {
  patientForm!: FormGroup<any>;
  errors: any = {};
  id: any;
  patient$: any;

  constructor(
    private formBuilder: FormBuilder,
 
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {

  
    this.appService.getPatient$.subscribe((data) => {
      this.patient$ = data;
      // build update from
      this.patientForm = this.formBuilder.group({
        firstName: new FormControl(this.patient$.firstName, [
          Validators.required,
        ]),
        lastName: new FormControl(this.patient$.lastName, [
          Validators.required,
        ]),
        birthday: new FormControl(this.patient$.birthday, [
          Validators.required,
        ]),
        sex: new FormControl(this.patient$.sex, []),
        email: new FormControl(this.patient$.email, [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl(this.patient$.phone, [Validators.required]),
        profession: new FormControl(this.patient$.profession, []),
        address: new FormControl(this.patient$.address, []),
        comment: new FormControl(this.patient$.comment, []),
      });
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
    console.log(this.patientForm);

    if (this.patientForm.valid)
      this.patientService
        .updatePatient(this.patientForm.value, this.patient$.id)
        .subscribe(
          (data) => {
            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(
              "Patient successfully updated!",
              "success",
              false
            );
            this.appService.setPatient$(data);
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
