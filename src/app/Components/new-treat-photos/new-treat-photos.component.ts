import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgxDropzoneModule } from "ngx-dropzone";
import { AddFileComponent } from "../add-file/add-file.component";
import { AppService } from "../../Core/Services/app.service";
import { TreatmentService } from "../../Core/Services/TreatService/treatment.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-new-treat-photos",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, AddFileComponent],
  templateUrl: "./new-treat-photos.component.html",
  styleUrl: "./new-treat-photos.component.css",
})
export class NewTreatPhotosComponent {
  files: File[] = [];
  existedFiles$: any[] = [];

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
    private appService: AppService,
    private treatmentService: TreatmentService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = data;
      this.existedFiles$ = this.treatment$.photos;
    });
  }

  existedFile(photo: any) {
    const result = this.existedFiles$?.filter(
      (file: { name: string }) => file?.name?.split(".")[0] == photo.name
    );
    return result[0];
  }

  onChangeFile(e: any) {
    this.files.push(e);
  }

  deletePhoto(id: any) {
    this.spinner.show();

    this.treatmentService.deleteFile(id).subscribe(
      (data) => {
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(data.message, "success", false);
      },
      (err) => {
        this.errors = this.handleErrors.handleError(err);
        this.spinner.hide();

        console.log("errors ", this.errors);
        this.handleAlerts.handleSweetAlert(
          "Check your data input carefully.",
          "error",
          false
        );
      }
    );
  }

  onDeleteFile(event: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonColor: "#b9b9b9",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "sweet-alert", // corrected class name
      },
    }).then(
      (result) => {
        // delete from existed files
        this.treatment$.photos = this.existedFiles$?.filter(
          (file) => file.name !== event.name
        );

        this.appService.setTreatment(this.treatment$);

        // delete from API
        this.deletePhoto(event.id);
      },
      (err) => {
        this.errors = this.handleErrors.handleError(err);
        this.spinner.hide();

        console.log("errors ", this.errors);
        this.handleAlerts.handleSweetAlert(
          "Check your data input carefully.",
          "error",
          false
        );
      }
    );
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.spinner.show();

    this.treatmentService
      .addTreatPhotos(this.files, this.treatment$.id, "photo")
      .subscribe(
        (data) => {
          this.appService.setTreatment(data);
          this.spinner.hide();
          this.files = [];
          this.handleAlerts.handleSweetAlert(
            "Patient successfully Added!",
            "success",
            false
          );
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
}
