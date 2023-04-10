import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';
import {Router} from "@angular/router";
import {SubmissionService} from "../../services/submission.service";
import { AuthService } from 'src/app/services/auth.service';
import { VoteRequest } from 'src/app/model/dto/VoteRequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  page: number = 0;

  constructor(
    private router: Router,
    private postService: SubmissionService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  // TODO: have a method called get Posts which will call the postService and get all the posts by pagination
  loadPosts(): void {
    this.postService.getPosts(this.page).subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(posts);
    })
  }

  loadNextPage() {
    this.page++;
    this.loadPosts();
  }

  showPost(postId: string): void {
    this.router.navigateByUrl(`/posts/${postId}`)
  }

  upvotePost(post: string): void {
    // set the vote type to upvote
    // set the username to the logged in user
    const username = this.authService.getLoggedInUsername() ?? '';
  
    const voteRequest: VoteRequest = {
      voteType: "UPVOTE",
      voterUsername: username,
      post: post
    }
  
    this.postService.vote(voteRequest).subscribe({
      next: (response) => {
        console.log("upvoted");
      },
      error: (error: HttpErrorResponse) => {
        console.log("error");
        console.error(error);
      }
    })
  }

  downvotePost(post: string): void {
    // set the vote type to downvote
    // set the username to the logged in user
    const username = this.authService.getLoggedInUsername() ?? '';
  
    const voteRequest: VoteRequest = {
      voteType: "DOWNVOTE",
      voterUsername: username,
      post: post
    }
  
    this.postService.vote(voteRequest).subscribe({
      next: (response) => {
        console.log("downvoted");
      },
      error: (error: HttpErrorResponse) => {
        console.log("error");
        console.error(error);
      }
    })
  }


  
}
