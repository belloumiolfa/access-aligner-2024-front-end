import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { data } from "jquery";
import { NgxDropzoneModule } from "ngx-dropzone";

@Component({
  selector: "app-add-file",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
  templateUrl: "./add-file.component.html",
  styleUrl: "./add-file.component.css",
})
export class AddFileComponent {
  @Output() file = new EventEmitter<any>();
  @Input() item!: any;
  @Input() existedFile!: any;
  imageUrl!: SafeUrl;

  selectedFiles: File[] = [];
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   }
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

  convertToUrlFile(file: any) {
    console.log(file);
  }

  getImageUrl(photo:any ) {
    // get imageUrl from array in appservice with id 
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(photo)
      );    
      //return this.imageUrl;

    };
    reader.readAsDataURL(photo);

  }
}
