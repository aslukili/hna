import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/model/Comment';
import { CommentRequest } from 'src/app/model/dto/CommentRequest';
import { AuthService } from 'src/app/services/auth.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  formGroup: FormGroup | undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: SubmissionService,
    private authService: AuthService
  ){

  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      content: [undefined, Validators.required],
      authorUsername: [undefined]
    })
  }


  onFormSubmit():void {
    // validate the form
    if(!this.formGroup?.valid){
      return;
    }

    // TODO call postComment from submission service here
    const authorUsername = this.authService.getLoggedInUsername();
    this.formGroup.controls['authorUsername'].setValue(authorUsername);
    console.log(this.formGroup.value);
    this.onPostComment(this.formGroup.value);
    this.onFormReset();
  }

  public onPostComment(commentRequest: CommentRequest): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    this.subscriptions.push(
      this.postService.postComment(id, commentRequest).subscribe({
        next: (response: Comment) => {
          console.log(response);
          console.log("worked");
          this.router.navigateByUrl(`posts/${id}`);
        },
        error: (error: HttpErrorResponse) => {
          console.error("an error happened");
          console.log(error);
        }
      })
    )
  }

  public onFormReset(): void {
    this.formGroup?.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
