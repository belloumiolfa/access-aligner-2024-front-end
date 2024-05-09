import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Shared/Elements/help-link/help-link.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-forget-password",
  standalone: true,
  imports: [HelpLinkComponent, ReactiveFormsModule, CommonModule],
  templateUrl: "./forget-password.component.html",
  styleUrl: "./forget-password.component.css",
})
export class ForgetPasswordComponent {
  form!: FormGroup;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }
  onSubmit(e: Event) {
    this.spinner.show();
  }
}
