import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubmissionRequest } from 'src/app/model/dto/SubmissionRequest';
import { Post } from 'src/app/model/Post';
import { AuthService } from 'src/app/services/auth.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {

  formGroup: FormGroup | undefined;
  private subscriptions: Subscription[] = [];

  
  constructor(    
    private formBuilder: FormBuilder,
    private router: Router,
    private postService: SubmissionService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: [undefined, Validators.required],
      type: [undefined],
      url: [undefined],
      description: [undefined],
      authorUsername: [undefined],
    });
  }

  onFormSubmit():void {
    // validate the form
    if(!this.formGroup?.valid){
      return;
    }

    // TODO call postComment from submission service here
    const authorUsername = this.authService.getLoggedInUsername();
    this.formGroup.controls['authorUsername'].setValue(authorUsername);
    this.formGroup.controls['type'].setValue('SUBMIT');
    console.log(this.formGroup.value);
    this.onSubmitPost(this.formGroup.value);
  }

  onSubmitPost(submissionRequest: SubmissionRequest): void {

    this.subscriptions.push(
      this.postService.submitPost(submissionRequest).subscribe({
        next: (response: Post) => {
          console.log(response);
          console.log("worked");
          this.router.navigateByUrl(`posts/${response.id}`);
        },
        error: (error: HttpErrorResponse) => {
          console.error("an error happened");
          console.log(error);
        }
      })
    );
  }

}
  
