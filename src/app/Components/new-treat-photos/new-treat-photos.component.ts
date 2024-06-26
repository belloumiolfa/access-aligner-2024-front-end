import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgxDropzoneModule } from "ngx-dropzone";
import { AddFileComponent } from "../add-file/add-file.component";
import { AppService } from "../../Core/Services/app.service";
import { TreatmentService } from "../../Core/Services/TreatService/treatment.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "app-new-treat-photos",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, AddFileComponent],
  templateUrl: "./new-treat-photos.component.html",
  styleUrl: "./new-treat-photos.component.css",
})
export class NewTreatPhotosComponent {
  files: File[] = [];
  existedFiles: any[] = [];

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
  treatment$!: any;
  errors: any;

  constructor(
    private sanitizer: DomSanitizer,
    private appService: AppService,
    private treatmentService: TreatmentService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
      this.treatment$?.photos?.forEach((element: any) => {
        this.getPhoto(element);
      });
      console.log(this.treatment$);
    });
  }

  getPhoto(file: any) {
    this.treatmentService.getTreatPhoto(file.id, this.treatment$.id).subscribe(
      (data) => {
        let exist = false;
        for (let i = 0; i < this.existedFiles.length; i++) {
          exist = this.existedFiles[i].name === file.name;
          break;
        }
        if (!exist) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            let photo = {
              resource: this.sanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(data)
              ),
              id: file.id,
              name: file.name,
              type: file.type,
            };
            this.existedFiles.push(photo);
          };
          reader.readAsDataURL(data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  existedFile(photo: any) {
    const result = this.existedFiles.filter(
      (file) => file.name.split(".")[0] == photo.name
    );
    return result[0];
  }

  onChangeFile(e: any) {
    this.files.push(e);
  }

  onDeleteFile(event: any) {
    this.existedFiles = this.existedFiles.filter(
      (file: any) => file.id !== event.id
    );
    this.files = this.files.filter((file: any) => file.name !== event.name);
    this.treatment$.photos = this.treatment$.photos.filter(
      (file: any) => file.id !== event.id
    );

    this.appService.setTreatment(this.treatment$);
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.treatmentService
      .addTreatPhotos(this.files, this.treatment$.id)
      .subscribe(
        (data) => {
          this.appService.setTreatment(data);
         // window.location.reload();
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

  onReset() {
    this.files = [];
  }

  ngOnDestroy(): void {
   
    console.log(this.files);
  }
}
