import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { FilesViewerComponent } from './files-viewer/files-viewer.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import {AgGridModule} from 'ag-grid-angular'
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    FilesViewerComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
