import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDecisionComponent } from './admin-decision.component';

describe('AdminDecisionComponent', () => {
  let component: AdminDecisionComponent;
  let fixture: ComponentFixture<AdminDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDecisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
