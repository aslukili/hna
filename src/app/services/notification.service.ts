import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Notification } from '../model/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly apiUrl = environment.apiUrl


  constructor(
    private http: HttpClient,
  ) { }


  public getNotificationsOfUser(username: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl+`/hn-notification/notifications/users/${username}`);
  }
}
