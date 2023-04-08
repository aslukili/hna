import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private readonly apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getPosts(page: number): Observable<Post[]> {
    const params = new HttpParams().set('page', page).set('size', 10);
    return this.http.get<Post[]>(`${this.apiUrl}/hn-post/submissions`, { params });
  }
}
