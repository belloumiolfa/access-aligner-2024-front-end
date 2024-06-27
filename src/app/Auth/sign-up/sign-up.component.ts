import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../Core/Services/AuthService/auth.service";
import { first } from "rxjs";
import { User } from "../../Core/Models/user.models";
import { PreloaderComponent } from "../../Shared/Ui/preloader/preloader.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import Swal from "sweetalert2";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PreloaderComponent,
   
    
  ],
  providers:[],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.css",
})
export class SignUpComponent {
  showRepeatPassword: boolean = false;
  showPassword: boolean = false;
  errors: any = {};
  formSubmitted: boolean = false;
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private router : Router

  ) {
    this.signUpForm = this.formBuilder.group({
      userName: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, ]),
      confirmPassword: new FormControl("", [Validators.required]),
      term: new FormControl("", [Validators.required]),
    });
  }



  ngOnInit(): void {
  
  }

  onSubmit(e: Event) {
    this.formSubmitted = true;
    this.errors = this.handleErrors.handleError({});

    console.log("form value",this.signUpForm.value)
    if (this.signUpForm.valid) {
      this.spinner.show();

      this.authService
        .signup(this.signUpForm.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(data.message, "success", false);
            this.router.navigate(['sign-in'])
          },
          (err) => {
            this.errors = this.handleErrors.handleError(err);
            this.spinner.hide();
            this.handleAlerts.handleSweetAlert(
              "Check your data input carefully.",
              "error",
              false
            );
          }
        );
    }
  }
}
