import { Component, OnInit } from '@angular/core';
import { AppService } from '../../Core/Services/app.service';
import { TreatmentService } from '../../Core/Services/TreatService/treatment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-treat-photos-informations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-treat-photos-informations.component.html',
  styleUrl: './patient-treat-photos-informations.component.css',
})
export class PatientTreatPhotosInformationsComponent implements OnInit {
  files: File[] = [];
  existedFiles$: any[] = [];

  photos = [
    {
      id: 0,
      required: true,
      name: 'smileExp',
      labelEn: 'Smiley expression',
      label: 'Face sourire',
    },
    {
      id: 1,
      required: true,
      name: 'overview',
      labelEn: 'Overview',
      label: 'Profile',
    },
    {
      id: 2,
      required: true,
      name: 'vestClosedOcc',
      labelEn: 'Vestibular closed occlusion',
      label: 'Occlussion Fermée vestibulaire',
    },
    {
      id: 3,
      required: true,
      name: 'closedLeftLatOCC',
      labelEn: 'Closed Left Lateral Occlusion',
      label: 'Occlussion Fermée Latérale gauche',
    },
    {
      id: 4,
      required: true,
      name: 'closedRightLatOcc',
      labelEn: 'Closed Right Lateral Occlusion',
      label: 'Occlussion Fermée Latérale droite',
    },
    {
      id: 5,
      required: true,
      name: 'supMaxiOcc',
      labelEn: 'Superior maxillary Occlusal view',
      label: 'Vue occlusale du maxillaire sup',
    },
    {
      id: 6,
      required: true,
      name: 'jawOccView',
      labelEn: 'Jaw Occlusal view',
      label: 'Vue occlusale de la mandibule',
    },
    {
      id: 7,
      required: true,
      name: 'panoramicRadio',
      labelEn: 'Panoramic Radio',
      label: 'Radio panoramique',
    },
    {
      id: 8,
      required: true,
      name: 'inocclusion',
      labelEn: 'Inocclusion',
      label: 'Inocclusion',
    },
    {
      id: 9,
      required: false,
      name: 'teleradio',
      labelEn: 'Teleradio',
      label: 'Téléradio ',
    },
  ];

  treatment$!: any;

  constructor(
    private appService: AppService,
    private treatmentService: TreatmentService
  ) {
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
    });
    this.appService.getTreatPhotos$.subscribe((data) => {
      this.existedFiles$ = data;
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    
  }

  existedFile(photo: any) {
    const result = this.existedFiles$?.filter(
      (file: { name: string }) => file?.name?.split('.')[0] == photo.name
    );

    return result[0];
  }
}
