import { Component } from '@angular/core';
import { AppService } from '../../Core/Services/app.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-treat-informations',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './patient-treat-informations.component.html',
  styleUrl: './patient-treat-informations.component.css',
})
export class PatientTreatInformationsComponent {
  treatment$!: any;

  constructor(private appService: AppService) {
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;

      console.log('dataa tratments', data);
    });
  }
}
