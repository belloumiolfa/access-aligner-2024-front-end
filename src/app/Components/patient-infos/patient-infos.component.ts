import { Component } from "@angular/core";
import { getDate } from "../../Core/Helpers/utils";
import { AppService } from "../../Core/Services/app.service";

@Component({
  selector: "app-patient-infos",
  standalone: true,
  imports: [],
  templateUrl: "./patient-infos.component.html",
  styleUrl: "./patient-infos.component.css",
})
export class PatientInfosComponent {
  patient$!: any;

  constructor(private appService: AppService) {
    this.appService.getPatient$.subscribe((data) => (this.patient$ = data));
  }

  getDate(date: any) {
    return getDate(date);
  }
}
