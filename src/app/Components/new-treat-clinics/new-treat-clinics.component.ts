import { Component } from "@angular/core";
import { AddFileComponent } from "../add-file/add-file.component";
import { CommonModule } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { TreatmentService } from "../../Core/Services/TreatService/treatment.service";
import { AppService } from "../../Core/Services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-new-treat-clinics",
  standalone: true,
  imports: [CommonModule, AddFileComponent],
  templateUrl: "./new-treat-clinics.component.html",
  styleUrl: "./new-treat-clinics.component.css",
})
export class NewTreatClinicsComponent {
  files: File[] = [];
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
  treatment$!: any;
  existedFiles$: any[] = [];
  errors: any;

  constructor(
    private appService: AppService,
    private treatmentService: TreatmentService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.appService.getTreatment$.subscribe((data) => {
      this.treatment$ = null;

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
      .addTreatPhotos(this.files, this.treatment$.id, "clinic")
      .subscribe(
        (data) => {
          console.log(data);

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
  onChangeFile($event: any) {
    this.files.push($event);
  }
}
