import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-new-treat-general",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./new-treat-general.component.html",
  styleUrl: "./new-treat-general.component.css",
})
export class NewTreatGeneralComponent {
  treatForm!: FormGroup<any>;
  constructor(private formBuilder: FormBuilder) {
    this.treatForm = this.formBuilder.group({
      treat: new FormControl("", [Validators.required]),
      postCross: new FormControl("", [Validators.required]),
      antCross: new FormControl("", [Validators.required]),
      gap: new FormControl("", [Validators.required]),
      overbite: new FormControl("", [Validators.required]),
      classI: new FormControl("", [Validators.required]),
      reduceOverbite: new FormControl("", [Validators.required]),
      crowding: new FormControl("", [Validators.required]),
      extract: new FormControl("", [Validators.required]),
    });
  }

  onSubmit($event: Event) {
    console.log(this.treatForm.value);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    // save treatment information  api
    console.log(this.treatForm.value);

    // emit data to new Treatment component to construct treatment object
  }
}
