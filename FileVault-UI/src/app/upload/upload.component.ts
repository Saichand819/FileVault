import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  private _snackBar = inject(MatSnackBar);
  
  selectedFile!: File | null;
  uploadMessage: string = '';
  selectedFileName = "";

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any) {
    console.log(event)
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.selectedFile ? this.selectedFile.name : "";
    }
  }

  uploadFile() {
    this.uploadService.uploadAFile(this.selectedFile);
    this.selectedFileName = "";
    this.selectedFile=null;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
