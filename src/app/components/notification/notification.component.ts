import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/model/Notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const username = this.authService.getLoggedInUsername();
    if(username == null) {
      console.log("username is null");
      return;
    }
    this.notificationService.getNotificationsOfUser(username).subscribe({
      next: (notifications: Notification[]) => {
        console.log("notifications");
        console.log(notifications);
        this.notifications = notifications;
      },
      error: (error: HttpErrorResponse) => {
        console.log("error");
        console.error(error);
      }
    });
  }

  readNotification(notificationId: number): void {
    this.notificationService.readNotification(notificationId).subscribe({
      next: (notification: Notification) => {
        console.log("readed");
        console.log(notification);
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        console.log("error");
        console.error(error);
      }
    })
  }
}
