import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit{
  post?: Post;
  
  constructor(
    private postService: SubmissionService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.postService.getPost(id).subscribe({
        next: (postResponse) => {
          this.post = postResponse;
          console.log(this.post);
        },
        error: (error) => {
          console.log('error');
          console.error(error);
        },
      });
    }
  }
}
