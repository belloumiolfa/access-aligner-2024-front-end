import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../Core/Services/AuthService/auth.service';
import { HandleErrorsService } from '../../Core/Helpers/handle-errors.service';
import { HandleAlertsService } from '../../Core/Helpers/handle-alerts.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;
  let spinnerService: NgxSpinnerService;
  let handleErrorsService: HandleErrorsService;
  let handleAlertsService: HandleAlertsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignUpComponent],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['signup']) },
        { provide: NgxSpinnerService, useValue: jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']) },
        { provide: HandleErrorsService, useValue: jasmine.createSpyObj('HandleErrorsService', ['handleError']) },
        { provide: HandleAlertsService, useValue: jasmine.createSpyObj('HandleAlertsService', ['handleSweetAlert']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    spinnerService = TestBed.inject(NgxSpinnerService);
    handleErrorsService = TestBed.inject(HandleErrorsService);
    handleAlertsService = TestBed.inject(HandleAlertsService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Tests will go here
  it('should create the form with default values', () => {
    expect(component.signUpForm).toBeDefined();
  
    const emailControl = component.signUpForm.get('email');
    const passwordControl = component.signUpForm.get('password');
    const confirmPasswordControl = component.signUpForm.get('confirmPassword');
    const userNameControl = component.signUpForm.get('userName');
    const phoneControl = component.signUpForm.get('phone');
    const termControl = component.signUpForm.get('term');
  
    expect(emailControl).toBeDefined();
    expect(passwordControl).toBeDefined();
    expect(confirmPasswordControl).toBeDefined();
    expect(userNameControl).toBeDefined();
    expect(phoneControl).toBeDefined();
    expect(termControl).toBeDefined();
  
    expect(emailControl?.value).toBe('');
    expect(passwordControl?.value).toBe('');
    expect(confirmPasswordControl?.value).toBe('');
    expect(userNameControl?.value).toBe('');
    expect(phoneControl?.value).toBe('');
    expect(termControl?.value).toBe('');
  });
  

 
  
});
