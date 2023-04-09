import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/Comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  comments: Comment[] = [];
  showReply: boolean = false;


  constructor(
    private router: Router,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId === null) {
      return;
    }
    this.commentService.getCommentsOfPost(postId).subscribe({
      next: (response: Comment[]) => {
        this.comments = response;
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error("an error happened");
        console.log(error);
      }
    })
  }

}

