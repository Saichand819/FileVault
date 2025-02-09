import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit,OnDestroy{
    notifcationMessage : string = "abcd"
    showNotification:boolean = false;
    isErrorNotification:boolean = true;

    subscription:Subscription = new Subscription();

    constructor(private uploadService:UploadService){}

    ngOnInit(): void {
      this.subscription.add(
        this.uploadService.isErrorNotification$.subscribe(data=>{
          this.isErrorNotification = data;
        })
      )

      this.subscription.add(
        this.uploadService.notificationMessage$.subscribe((data)=>{
          this.notifcationMessage = data;
        })
      )

      this.subscription.add(
        this.uploadService.showNotificationMessage$.subscribe((data)=>{
          this.showNotification = data;
        })
      )
    }


    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }


    getStyleClass(){
      if(this.isErrorNotification){
        return 'notificationContainer-error'
      }
      return 'notificationContainer-success'
    }

    

    closeNotification(){
      this.uploadService.closeNotification();
    }

}
