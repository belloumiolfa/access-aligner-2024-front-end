import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDecisionComponent } from './accept-decision.component';

describe('AcceptDecisionComponent', () => {
  let component: AcceptDecisionComponent;
  let fixture: ComponentFixture<AcceptDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptDecisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
