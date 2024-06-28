import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnInit } from "@angular/core";
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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";

import { MatInputModule } from "@angular/material/input";

import { provideNativeDateAdapter } from "@angular/material/core";

declare var $: any;

@Component({
  selector: "app-patient-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./patient-form.component.html",
  styleUrl: "./patient-form.component.css",
})
export class PatientFormComponent implements OnInit {
  patientForm!: FormGroup<any>;
  errors: any = {};
  user$!: any;
  patient$!: any;
  patients$!: any;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
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
    this.appService.getPatients$.subscribe((data) => (this.patients$ = data));

      this.patientForm = this.formBuilder.group({
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        birthday: new FormControl(null),
        sex: new FormControl("", []),
        email: new FormControl("", [Validators.required, Validators.email]),
        phone: new FormControl("", [Validators.required]),
        profession: new FormControl("", []),
        address: new FormControl("", []),
        comment: new FormControl("", []),
      });
  }
  ngOnInit(): void {
    $("#datetimepicker")
      .bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
      })
      .on("change", (e: any, date: { format: (arg0: string) => any }) => {
        const formattedDate = date.format("YYYY-MM-DD");
        this.patientForm.get("birthday")?.setValue(formattedDate);
        console.log("Selected Date:", formattedDate);
      });
  }

  onSubmit(e: any) {
    this.errors = this.handleErrors.handleError({});

    if (this.patientForm.valid)
      if (!this.patient$.id) this.saveNewPatient();
      else this.updatePatient();
  }

  saveNewPatient() {
    this.patientService
      .addPatient(this.patientForm.value, this.user$.id)
      .subscribe(
        (data) => {
          this.appService;

          this.handleAlerts.handleSweetAlert(
            "Patient successfully Added!",
            "success",
            false
          );
          console.log(data);

          this.appService.setPatients$(data);
          this.patientForm.reset();
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

  updatePatient() {
    this.patientService
      .updatePatient(this.patientForm.value, this.patient$.id)
      .subscribe(
        (data) => {
          this.spinner.hide();

          this.appService.setPatient$(data);
          this.patients$.push(data);

          this.appService.setPatients$(this.patients$);

          this.handleAlerts.handleSweetAlert(
            "Patient successfully updated!",
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
