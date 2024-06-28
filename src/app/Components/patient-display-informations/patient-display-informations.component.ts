import { Component } from '@angular/core';
import { AppService } from '../../Core/Services/app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-display-informations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-display-informations.component.html',
  styleUrl: './patient-display-informations.component.css',
})
export class PatientDisplayInformationsComponent {
  patient$!: any;

  constructor(private appService: AppService) {
    this.appService.getPatient$.subscribe((data) => {
      this.patient$ = data;
    });
  }
}
