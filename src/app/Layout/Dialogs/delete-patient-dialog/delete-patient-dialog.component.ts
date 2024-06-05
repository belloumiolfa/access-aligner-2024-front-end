import { Component } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButton, MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-delete-patient-dialog',
  standalone: true,
  imports: [ 
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent, MatButtonModule],
  templateUrl: './delete-patient-dialog.component.html',
  styleUrl: './delete-patient-dialog.component.css'
})
export class DeletePatientDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeletePatientDialogComponent>) {}


  onConfirm() {
    // Perform confirm logic here (e.g., emit an event, call a service)
    this.dialogRef.close(true); // Close dialog with confirmation
  }

  onClose() {
    this.dialogRef.close(false); // Close dialog without confirmation
  }
}
