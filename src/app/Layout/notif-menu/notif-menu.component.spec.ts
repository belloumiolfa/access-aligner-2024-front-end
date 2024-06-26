import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifMenuComponent } from './notif-menu.component';

describe('NotifMenuComponent', () => {
  let component: NotifMenuComponent;
  let fixture: ComponentFixture<NotifMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
