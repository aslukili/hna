import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Comment } from '../model/Comment';
import { CommentRequest } from '../model/dto/CommentRequest';
import { SubmissionRequest } from '../model/dto/SubmissionRequest';
import { VoteRequest } from '../model/dto/VoteRequest';
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

  postComment(postId: string, comment: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/hn-post/submissions/${postId}/comments`, comment);
  }


  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/hn-post/submissions/${id}`);
  }

  submitPost(submissionRequest: SubmissionRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/hn-post/submissions`, submissionRequest);
  }

  getPostsOfUser(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/hn-post/submissions/user/${username}`);
  }


  vote(voteRequest: VoteRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/hn-post/votes`, voteRequest);
  }

}
