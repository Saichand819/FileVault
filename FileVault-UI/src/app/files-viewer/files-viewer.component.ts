import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { UploadService } from '../upload.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-files-viewer',
  templateUrl: './files-viewer.component.html',
  styleUrls: ['./files-viewer.component.css']
})
export class FilesViewerComponent implements OnInit,OnDestroy{

  subscription: Subscription = new Subscription();

  filesList:string[] = []

  constructor(private uploadService:UploadService){}


  ngOnInit(): void {
    
    this.uploadService.getAllFiles();

    this.subscription.add(
      this.uploadService.filesList$.subscribe(data=>{
        this.filesList = data;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  rowData = []
    


colDefs: ColDef[] = [
    { field: "File Name" },
    { field: "Download" },
];

defaultColDef: ColDef = {
  flex: 1,
};
} 
