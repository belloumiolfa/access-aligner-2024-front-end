import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTreatmentComponent } from './add-new-treatment.component';

describe('AddNewTreatmentComponent', () => {
  let component: AddNewTreatmentComponent;
  let fixture: ComponentFixture<AddNewTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
