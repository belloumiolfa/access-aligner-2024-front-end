import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDecisionComponent } from './accept-decision.component';

describe('AcceptDecisionComponent', () => {
  let component: AcceptDecisionComponent;
  let fixture: ComponentFixture<AcceptDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptDecisionComponent]
    })
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AcceptDecisionComponent);
    const component = fixture.componentInstance;

    // Mock user object with profile and photo
    const mockUser = {
      user: { status: 'confirmed' }
    };

    component.user = mockUser; 

    fixture.detectChanges(); // Trigger change detection

    expect(component).toBeTruthy();
  });
});