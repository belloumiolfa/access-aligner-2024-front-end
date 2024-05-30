import { Component } from "@angular/core";
import { PatientUpdateFormComponent } from "../patient-update-form/patient-update-form.component";

@Component({
  selector: "app-new-treat-patient",
  standalone: true,
  imports: [PatientUpdateFormComponent],
  templateUrl: "./new-treat-patient.component.html",
  styleUrl: "./new-treat-patient.component.css",
})
export class NewTreatPatientComponent {}
