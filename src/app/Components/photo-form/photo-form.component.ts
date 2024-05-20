import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";

import { AppService } from "../../Core/Services/app.service";
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxSpinnerService } from "ngx-spinner";
import { HandleAlertsService } from "../../Core/Helpers/handle-alerts.service";
import { HandleErrorsService } from "../../Core/Helpers/handle-errors.service";
import { UserService } from "../../Core/Services/UserService/user.service";
/* import { Ng2ImgMaxService } from "ng2-img-max";
 */
@Component({
  selector: "app-photo-form",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
  templateUrl: "./photo-form.component.html",
  styleUrl: "./photo-form.component.css",
})
export class PhotoFormComponent {
  selectedFile: File[] = [];
  user$!: any;
  errors!: any;

  constructor(
    /*     private ng2ImgMax: Ng2ImgMaxService,   */
    private appService: AppService,
    private userService: UserService,
    private handleErrors: HandleErrorsService,
    private handleAlerts: HandleAlertsService,
    private spinner: NgxSpinnerService
  ) {
    this.appService.getUser$.subscribe((data) => (this.user$ = data));
  }

  onSelect(event: any) {
    this.selectedFile = event.addedFiles;
    this.renameFile();
  }

  onRemove(event: any) {
    this.selectedFile.splice(this.selectedFile.indexOf(event), 1);
  }

  /*   resizeImage() {
    if (this.selectedFile) {
      this.ng2ImgMax.resizeImage(this.selectedFile[0], 300, 300).subscribe(
        (result: any) => {
          // Resize successful, result is a resized File object
          console.log("Resized image:", result);
          // You can now upload or display the resized image
        },
        (error: any) => {
          console.log("Error resizing image:", error);
        }
      );
    }
  }
 */

  renameFile() {
    if (this.selectedFile) {
      // Extract file extension from original filename
      const originalFilenameParts = this.selectedFile[0].name.split(".");
      const fileExtension =
        originalFilenameParts[originalFilenameParts.length - 1];

      // Create new filename with desired name and original extension
      const newFilename = `photo-${this.user$.id}.` + fileExtension;

      // Create new File object with the new filename and original content
      const renamedFile = new File([this.selectedFile[0]], newFilename, {
        type: this.selectedFile[0].type,
      });
      //console.log("Renamed file:", renamedFile);
      // Now you can use the renamedFile object as needed
      this.selectedFile[0] = renamedFile;
    }
  }

  submitPhoto(event$: any) {
    event$.preventDefault();

    this.errors = this.handleErrors.handleError({});
    this.spinner.show();

    this.userService.updatePhoto(this.selectedFile[0], this.user$.id).subscribe(
      (data) => {
        console.log("photo from update photot ", data);

        this.appService.setPhoto$(data);
        this.spinner.hide();
        // real time update profile photo call the get photo service in appService

        this.handleAlerts.handleSweetAlert(
          "Photo successfully Updated ",
          "success",
          false
        );
      },
      (err) => {
        this.spinner.hide();
        this.errors = this.handleErrors.handleError(err);
        this.spinner.hide();
        this.handleAlerts.handleSweetAlert(
          "Check your data input carefully.",
          "error",
          false
        );
        console.log(this.errors);
      }
    );
  }
}
