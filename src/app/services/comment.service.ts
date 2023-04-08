import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Comment } from '../model/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getCommentsOfPost(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/hn-post/submissions/${postId}/comments`);
  }

  
}
