import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { data } from "jquery";
import { NgxDropzoneModule } from "ngx-dropzone";
import { UserService } from "../../Core/Services/UserService/user.service";

@Component({
  selector: "app-add-file",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
  templateUrl: "./add-file.component.html",
  styleUrl: "./add-file.component.css",
})
export class AddFileComponent {
  @Output() file = new EventEmitter<any>();
  @Output() deletedFile = new EventEmitter<any>();

  @Input() item!: any;
  @Input() existedFile!: any;
  @Input() acceptedType!: any;

  selectedFiles: File[] = [];

  constructor() {}

  renameFile(item: any) {
    if (this.selectedFiles) {
      // Extract file extension from original filename
      const originalFilenameParts = this.selectedFiles[0].name.split(".");
      const fileExtension =
        originalFilenameParts[originalFilenameParts.length - 1];

      // Create new filename with desired name and original extension
      //namephoto+treatid+patientid
      const newFilename = `${item.name}.` + fileExtension;

      // Create new File object with the new filename and original content
      const renamedFile = new File([this.selectedFiles[0]], newFilename, {
        type: this.selectedFiles[0].type,
      });
      //console.log("Renamed file:", renamedFile);
      // Now you can use the renamedFile object as needed
      this.selectedFiles[0] = renamedFile;
    }
  }

  onSelect(event: any, item: any) {
    this.selectedFiles = event.addedFiles;

    this.renameFile(item);
    this.file.emit(this.selectedFiles[0]);
  }

  onRemove(event: any) {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }

  deleteFile(existedFile: any) {
    this.deletedFile.emit(existedFile);
  }
}
