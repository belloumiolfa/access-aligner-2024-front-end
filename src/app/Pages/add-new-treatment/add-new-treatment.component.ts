import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, last } from 'rxjs';
import { HandleAlertsService } from '../../Core/Helpers/handle-alerts.service';
import { HandleErrorsService } from '../../Core/Helpers/handle-errors.service';
import { PatientService } from '../../Core/Services/PatientService/patient.service';
import { AppService } from '../../Core/Services/app.service';
import { StepsService } from '../../Core/Services/Steps/steps.service';
import { TimelineTreatmentsComponent } from '../timeline-treatments/timeline-treatments.component';
import { TreatmentService } from '../../Core/Services/TreatService/treatment.service';

declare var $: any;
@Component({
  selector: 'app-add-new-treatment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    TimelineTreatmentsComponent,
  ],
  templateUrl: './add-new-treatment.component.html',
  styleUrl: './add-new-treatment.component.css',
})
export class AddNewTreatmentComponent {
  id!: number;
  errors: any;
  patient$!: any;
  treatments$!: any;
  clickedIndex!: any;

  steps = [
    {
      id: 1,
      label: 'Patient Information',
      url: 'patient',
      done: false,
    },
    {
      id: 2,
      label: 'Treatment Information',
      url: 'general',
      done: false,
    },
    {
      id: 3,
      label: 'Teeth Information',
      url: 'teeth',
      done: false,
    },
    {
      id: 4,
      label: 'Photographs and x-rays',
      url: 'photos',
      done: false,
    },
    {
      id: 5,
      label: 'Clinics ',
      url: 'clinics',
      done: false,
    },
  ];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private handleErrors: HandleErrorsService,
    private spinner: NgxSpinnerService,
    private appService: AppService,
    private stepsService: StepsService,
    private treatService: TreatmentService
  ) {
    this.stepsService.getClickedIndex$.subscribe((data) => {
      this.clickedIndex = data;
    });

    this.activeRoute.params.subscribe((params) => (this.id = params['id']));
    this.appService.getPatient$.subscribe((data) => (this.patient$ = data));

    this.appService.getTreatment$.subscribe((data) => {
      this.treatments$ = data;

      if (this.treatments$.treat != null) {
        this.steps[1].done = true;
      }

      if (this.treatments$.teeth.length != 0) {
        this.steps[2].done = true;
      }

      if (this.treatments$.photos.length != 0) {
        this.steps[3].done = true;
      }
    });

    this.steps[1].done = false;
    this.steps[2].done = false;
    this.steps[3].done = false;
  }

  ngOnInit(): void {
    let url = this.router.url.split('/');

    this.clickedIndex = this.steps.findIndex((step) => {
      return step.url == url[url.length - 1];
    });
    if (this.id != null)
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

    $('#finishModal').appendTo('body');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('on destroy add new treatment');
    this.appService.setPatient$({});
    this.appService.setTreatment({});
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

  finishing() {}

  saveTreatment() {
    let status = 'Finished';
    this.treatService
      .saveTreatement(this.treatments$.id, status)
      .subscribe((data) => {
        console.log('data ', data);
      });
  }
}
