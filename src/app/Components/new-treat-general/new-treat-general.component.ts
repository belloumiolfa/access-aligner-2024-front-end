import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TreatmentService } from "../../Core/Services/TreatService/treatment.service";
import { AppService } from "../../Core/Services/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-new-treat-general",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./new-treat-general.component.html",
  styleUrl: "./new-treat-general.component.css",
})
export class NewTreatGeneralComponent {
  treatForm!: FormGroup<any>;
  patient$!: any;
  doctor$!: any;
  errors: any;
  savedTreatment$!: any;

  constructor(
    private formBuilder: FormBuilder,
    private treatmentService: TreatmentService,
    private appService: AppService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    appService.getPatient$.subscribe((data) => (this.patient$ = data));
    appService.getUser$.subscribe((data) => (this.doctor$ = data));

    appService.getTreatment$.subscribe((data) => {
      this.savedTreatment$ = data;
      this.treatForm = this.formBuilder.group({
        description: new FormControl(this.savedTreatment$.description),
        treat: new FormControl(this.savedTreatment$.treat, [
          Validators.required,
        ]),
        postCross: new FormControl(this.savedTreatment$.postCross, [
          Validators.required,
        ]),
        antCross: new FormControl(this.savedTreatment$.antCross, [
          Validators.required,
        ]),
        gap: new FormControl(this.savedTreatment$.gap, [Validators.required]),
        overbite: new FormControl(this.savedTreatment$.overbite, [
          Validators.required,
        ]),
        classI: new FormControl(this.savedTreatment$.classI, [
          Validators.required,
        ]),
        reduceOverbite: new FormControl(this.savedTreatment$.reduceOverbite, [
          Validators.required,
        ]),
        crowding: new FormControl(this.savedTreatment$.crowding, [
          Validators.required,
        ]),
        extract: new FormControl(this.savedTreatment$.extract, [
          Validators.required,
        ]),
      });
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    this.spinner.show();
    this.treatmentService
      .addTreatInfo(this.treatForm.value, this.patient$.id, this.doctor$.id)
      .subscribe(
        (data) => {
          this.spinner.hide();
          // set treatment
          this.handleAlerts.handleSweetAlert(
            "Treatment information successfully added. ",
            "success",
            false
          );

          this.appService.setTreatment(data);
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
