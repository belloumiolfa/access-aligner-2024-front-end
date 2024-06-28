import { Component } from '@angular/core';
import { PatientDisplayInformationsComponent } from '../../Components/patient-display-informations/patient-display-informations.component';
import { PatientTreatInformationsComponent } from '../../Components/patient-treat-informations/patient-treat-informations.component';
import { PatientTreatTeethInformationsComponent } from '../../Components/patient-treat-teeth-informations/patient-treat-teeth-informations.component';
import { PatientTreatPhotosInformationsComponent } from '../../Components/patient-treat-photos-informations/patient-treat-photos-informations.component';
import { PatientTreatClinicsInformationsComponent } from '../../Components/patient-treat-clinics-informations/patient-treat-clinics-informations.component';

@Component({
  selector: 'app-timeline-treatments',
  standalone: true,
  imports: [PatientDisplayInformationsComponent, PatientTreatInformationsComponent, 
    PatientTreatTeethInformationsComponent, PatientTreatPhotosInformationsComponent,
  PatientTreatClinicsInformationsComponent
  ],
  templateUrl: './timeline-treatments.component.html',
  styleUrl: './timeline-treatments.component.css'
})
export class TimelineTreatmentsComponent {

}
