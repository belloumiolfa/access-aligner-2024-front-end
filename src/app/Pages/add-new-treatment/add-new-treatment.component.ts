import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription, last } from "rxjs";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { PatientService } from "../../Core/Services/PatientService/patient.service";
import { AppService } from "../../Core/Services/app.service";
@Component({
  selector: "app-add-new-treatment",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: "./add-new-treatment.component.html",
  styleUrl: "./add-new-treatment.component.css",
})
export class AddNewTreatmentComponent {
  id!: number;
  errors: any;
  patient$!: any;
  clickedIndex = 0;

  steps = [
    {
      id: 1,
      label: "Patient Information",
      url: "patient",
      done: false,
    },
    {
      id: 2,
      label: "Treatment Information",
      url: "general",
      done: false,
    },
    {
      id: 3,
      label: "Teeth Information",
      url: "teeth",
      done: false,
    },
    {
      id: 4,
      label: "Photographs",
      url: "photos",
      done: false,
    },
    {
      id: 5,
      label: "Clinics and x-rays",
      url: "clinics",
      done: false,
    },
  ];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) {
    this.activeRoute.params.subscribe((params) => (this.id = params["id"]));
    this.appService.getPatient$.subscribe((data) => (this.patient$ = data));
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    let url = this.router.url.split("/");
    this.clickedIndex = this.steps.findIndex((step) => {
      return step.url == url[url.length - 1];
    });

    this.patientService.getPatient(this.id).subscribe(
      (data) => {
        this.spinner.hide();
        this.steps[0].done = true;
        this.appService.setPatient$(data);
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
      }
    );
  }

  nextStep() {
    this.clickedIndex = this.clickedIndex + 1;
    this.router.navigate([
      `treatment/new-treatment/${this.patient$.id}/${
        this.steps[this.clickedIndex].url
      }`,
    ]);
  }
  previousStep() {
    this.clickedIndex -= 1;
    this.router.navigate([
      `treatment/new-treatment/${this.patient$.id}/${
        this.steps[this.clickedIndex].url
      }`,
    ]);
  }
  finishing() {
    this.router.navigate([
      `treatment/new-treatment/${this.patient$.id}/${
        this.steps[this.clickedIndex].url
      }`,
    ]);

    // redirect to verify data page to cofirm informations
  }
}
