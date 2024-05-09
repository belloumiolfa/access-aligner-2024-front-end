import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptFormComponent } from './accept-form.component';

describe('AcceptFormComponent', () => {
  let component: AcceptFormComponent;
  let fixture: ComponentFixture<AcceptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
