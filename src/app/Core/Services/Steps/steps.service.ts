import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  constructor() {}

  clickedIndex$ = new BehaviorSubject<number>(0);

  getClickedIndex$ = this.clickedIndex$.asObservable();
  steps = [
    {
      id: 1,
      label: 'Patient Information',
      url: 'patient',
      done: false,
      current: false,
    },
    {
      id: 2,
      label: 'Treatment Information',
      url: 'general',
      done: false,
      current: false,
    },
    {
      id: 3,
      label: 'Teeth Information',
      url: 'teeth',
      done: false,
      current: false,
    },
    {
      id: 4,
      label: 'Photographs and x-rays',
      url: 'photos',
      done: false,
      current: false,
    },
    {
      id: 5,
      label: 'Clinics ',
      url: 'clinics',
      done: false,
      current: false,
    },
  ];

  getSteps(): any[] {
    return this.steps;
  }

  markStepAsDone(stepIndex: number): void {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.steps[stepIndex].done = true;
    }
  }

  markCurrentStep(stepIndex: any) {
    this.clickedIndex$.next(stepIndex);
  }

  returnClickIndex() {}
}
