import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpdateFormTreatComponent } from './patient-update-form-treat.component';

describe('PatientUpdateFormTreatComponent', () => {
  let component: PatientUpdateFormTreatComponent;
  let fixture: ComponentFixture<PatientUpdateFormTreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientUpdateFormTreatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientUpdateFormTreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
