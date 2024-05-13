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
import { first } from "rxjs";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { AuthService } from "../../Core/Services/auth.service";
import { signInUser } from "../../Core/Helpers/utils";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.css",
})
export class SignInComponent {
  // sign up request
  signInForm!: FormGroup;
  showPassword: boolean = false;
  errors: any = {
    code: "",
    message: "",
  };
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.signInForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      keepLoggedIn: new FormControl(false),
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  onSubmit(e: Event) {
    this.formSubmitted = true;
    this.errors = this.handleErrors.handleError({});
    this.spinner.show();

    console.log(this.signInForm.value.keepLoggedIn);

    if (this.signInForm.valid) {
      this.authService
        .login(this.signInForm.value.email, this.signInForm.value.password)
        .pipe(first())
        .subscribe(
          (data) => {
            this.spinner.hide();

            signInUser(data.accessToken, this.signInForm.value.keepLoggedIn);

            this.router.navigate(["/"]);
          },
          (err) => {
            this.spinner.hide();
            this.errors = this.handleErrors.handleError(err);
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
