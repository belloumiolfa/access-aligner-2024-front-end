import { Component, OnInit } from '@angular/core';
import { PatientDisplayInformationsComponent } from '../../Components/patient-display-informations/patient-display-informations.component';
import { PatientTreatInformationsComponent } from '../../Components/patient-treat-informations/patient-treat-informations.component';
import { PatientTreatTeethInformationsComponent } from '../../Components/patient-treat-teeth-informations/patient-treat-teeth-informations.component';
import { PatientTreatPhotosInformationsComponent } from '../../Components/patient-treat-photos-informations/patient-treat-photos-informations.component';
import { PatientTreatClinicsInformationsComponent } from '../../Components/patient-treat-clinics-informations/patient-treat-clinics-informations.component';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../Core/Services/app.service';

@Component({
  selector: 'app-timeline-treatments',
  standalone: true,
  imports: [
    PatientDisplayInformationsComponent,
    PatientTreatInformationsComponent,
    PatientTreatTeethInformationsComponent,
    PatientTreatPhotosInformationsComponent,
    PatientTreatClinicsInformationsComponent,
    RouterModule,
  ],
  templateUrl: './timeline-treatments.component.html',
  styleUrl: './timeline-treatments.component.css',
})
export class TimelineTreatmentsComponent implements OnInit {
  patient$!: any;

  id: any;

  constructor(private appService: AppService, router:Router) {
    this.appService.getPatient$.subscribe((data: any ) => {
    this.id=data.id ; 
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
