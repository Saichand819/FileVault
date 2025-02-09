import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private UPLOAD_URL = '/fileVault/upload'; 
  private GET_URL = '/fileVault/get-uploads';
  private DOWNLOAD_URL = '/fileVault/download?fileName='

  private _notificationMessageSubject = new BehaviorSubject("");
  public notificationMessage$ = this._notificationMessageSubject.asObservable();

  private _showNotificationMessageSubject = new BehaviorSubject(false);
  public showNotificationMessage$ = this._showNotificationMessageSubject.asObservable();

  private _isErrorNotificationSubject = new BehaviorSubject(false);
  public isErrorNotification$ = this._isErrorNotificationSubject.asObservable();

  private _filesListSubject = new BehaviorSubject<string[]>([]);
  public filesList$ = this._filesListSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllFiles(){
    this.http.get(this.GET_URL).subscribe(
      (data:any)=>{
        this._filesListSubject.next(data);
     },
     (err)=>{
      console.log(err)
      this.openNotification("Something went wrong",true);
     }
    );
  }


  uploadAFile(file: File | null): void {

    if (!file) {
      this.openNotification("Please select a file first.",true);
      return;
    }


    const formData = new FormData();
    formData.append('file', file);

    this.http.post(this.UPLOAD_URL, formData, {
      responseType: 'text', 
    }).subscribe(
      (response) => {
        this.openNotification(response, false);
        this.getAllFiles();
      },
      (error) => {
        // console.error(error);
        this.openNotification(error.error,true);
      }
    );;
  }

  openNotification(notifcationMessage:string,isErrorNotification:boolean){
    this._isErrorNotificationSubject.next(isErrorNotification);
    this._notificationMessageSubject.next(notifcationMessage);
    this._showNotificationMessageSubject.next(true);
  } 

  closeNotification(){
    this._showNotificationMessageSubject.next(false);
  }


}
