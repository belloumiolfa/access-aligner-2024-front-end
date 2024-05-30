import { Component } from "@angular/core";
import { AddFileComponent } from "../add-file/add-file.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-new-treat-clinics",
  standalone: true,
  imports: [CommonModule, AddFileComponent],
  templateUrl: "./new-treat-clinics.component.html",
  styleUrl: "./new-treat-clinics.component.css",
})
export class NewTreatClinicsComponent {
  files: File[] = [];

  onSubmit(e: any) {
    e.preventDefault();
    console.log(this.files);
  }
  onReset() {
    this.files = [];
  }
  onChangeFile($event: any) {
    this.files.push($event);
  }
  
  clinics = [
    {
      id: 0,
      required: true,
      name: "maxillaryDigit",
      labelEn: "Maxillary digital impression. ",
      label: "Empriente numérique maxillaire",
    },
    {
      id: 1,
      required: true,
      name: "mandibularDigit",
      labelEn: "Mandibular digital impression",
      label: "Empriente numérique mandibulaire",
    },
    {
      id: 2,
      required: true,
      name: "occlusalDigit",
      labelEn: "Occlusal digital impression.",
      label: "Empriente numérique occlusion",
    },
    {
      id: 3,
      required: false,
      name: "optionalDigit",
      labelEn: "Optional digital impression.",
      label: "Empriente numerique facultative",
    },
  ];
}
