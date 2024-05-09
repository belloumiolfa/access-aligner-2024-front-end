import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsckConfirmComponent } from './asck-confirm.component';

describe('AsckConfirmComponent', () => {
  let component: AsckConfirmComponent;
  let fixture: ComponentFixture<AsckConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsckConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsckConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
