import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';
import {Router} from "@angular/router";
import {SubmissionService} from "../../services/submission.service";

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
    private postService: SubmissionService
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

}
