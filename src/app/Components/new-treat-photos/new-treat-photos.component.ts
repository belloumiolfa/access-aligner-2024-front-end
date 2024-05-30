import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgxDropzoneModule } from "ngx-dropzone";
import { AddFileComponent } from "../add-file/add-file.component";

@Component({
  selector: "app-new-treat-photos",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, AddFileComponent],
  templateUrl: "./new-treat-photos.component.html",
  styleUrl: "./new-treat-photos.component.css",
})
export class NewTreatPhotosComponent {
  files: File[] = [];

  photos = [
    {
      id: 0,
      required: true,
      name: "smileExp",
      labelEn: "Smiley expression",
      label: "Face sourire",
    },
    {
      id: 1,
      required: true,
      name: "overview",
      labelEn: "Overview",
      label: "Profile",
    },
    {
      id: 2,
      required: true,
      name: "vestClosedOcc",
      labelEn: "Vestibular closed occlusion",
      label: "Occlussion Fermée vestibulaire",
    },
    {
      id: 3,
      required: true,
      name: "closedLeftLatOCC",
      labelEn: "Closed Left Lateral Occlusion",
      label: "Occlussion Fermée Latérale gauche",
    },
    {
      id: 4,
      required: true,
      name: "closedRightLatOcc",
      labelEn: "Closed Right Lateral Occlusion",
      label: "Occlussion Fermée Latérale droite",
    },
    {
      id: 5,
      required: true,
      name: "supMaxiOcc",
      labelEn: "Superior maxillary Occlusal view",
      label: "Vue occlusale du maxillaire sup",
    },
    {
      id: 6,
      required: true,
      name: "jawOccView",
      labelEn: "Jaw Occlusal view",
      label: "Vue occlusale de la mandibule",
    },
    {
      id: 7,
      required: true,
      name: "panoramicRadio",
      labelEn: "Panoramic Radio",
      label: "Radio panoramique",
    },
    {
      id: 8,
      required: true,
      name: "inocclusion",
      labelEn: "Inocclusion",
      label: "Inocclusion",
    },
    {
      id: 9,
      required: false,
      name: "teleradio",
      labelEn: "Teleradio",
      label: "Téléradio ",
    },
  ];

  onChangeFile(e: any) {
    this.files.push(e);
  }
  onSubmit(e: any) {
    e.preventDefault();
    console.log(this.files);
  }
  onReset() {
    this.files = [];
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log(this.files);
  }
}
