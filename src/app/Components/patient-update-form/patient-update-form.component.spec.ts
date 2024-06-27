import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpdateFormComponent } from './patient-update-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PatientUpdateFormComponent', () => {
  let component: PatientUpdateFormComponent;
  let fixture: ComponentFixture<PatientUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientUpdateFormComponent],
      providers: [      HttpClient , HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
