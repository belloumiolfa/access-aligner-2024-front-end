import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../Core/Services/app.service';

import { teeth } from '../../Shared/Static Data/teeth';

@Component({
  selector: 'app-patient-treat-teeth-informations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-treat-teeth-informations.component.html',
  styleUrl: './patient-treat-teeth-informations.component.css'
})
export class PatientTreatTeethInformationsComponent implements OnInit{



  colors = [
    { id: 0, color: '#FFFFFF', class: 'btn-simple', label: 'undo' },

    { id: 1, color: '#3F51B5', class: 'bg-indigo', label: 'Missing' },
    { id: 2, color: '#009688', class: 'bg-teal', label: 'No moving' },
    { id: 3, color: '#FFC107', class: 'bg-amber', label: 'Implant' },
    { id: 4, color: '#F44336', class: 'bg-red', label: 'Crown' },
  ];
  color: any = {};
  teethTab: any[] = [];
  treatment$!: any;


  constructor (
    private appService: AppService,

  ){}
  ngOnInit(): void {
    
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
      this.teethTab.forEach((e) => {
        e.status = 0;
        e.color = '';
      });

      this.teethTab = teeth;

      this.treatment$.teeth?.forEach((element: any) => {
        this.changeColor(element.num, this.colors[element.action]);
      });
    });



  }

  changeColor(id: number, color: any) {
    this.teethTab.find((currentItem) => {
      if (currentItem.id === id) {
        currentItem.color = color.color;
        currentItem.status = color.id;
      }
    });
  }




}
