import { Component } from "@angular/core";
import { HelpLinkComponent } from "../../Shared/Elements/help-link/help-link.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-update-password",
  standalone: true,
  imports: [HelpLinkComponent, ReactiveFormsModule, CommonModule],
  templateUrl: "./update-password.component.html",
  styleUrl: "./update-password.component.css",
})
export class UpdatePasswordComponent {
  updateForm!: FormGroup;
  showNewPassword: any;
  showOldPassword: any;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.updateForm = this.formBuilder.group({
      oldPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(e: Event) {
    // show spinner
    this.spinner.show();
  }
}
