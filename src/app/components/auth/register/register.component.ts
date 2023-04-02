import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthResponse } from 'src/app/model/AuthResponse';
import { RegisterRequest } from 'src/app/model/RegisterRequest';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formGroup: FormGroup | undefined;
  // instead of defining a subscription for each method, we declare an array of subs
  private subscriptions: Subscription[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }
 
  ngOnInit(): void {
    // if there is already a sigged in  user the redirect to profile
    if(this.authService.isUserLoggedIn()){
      this.router.navigateByUrl('/profile'); 
    }


    this.formGroup = this.formBuilder.group(
      {
        fullName: [undefined, Validators.required],
        username: [undefined, Validators.required],
        password: [undefined, [Validators.required, Validators.minLength(5)]],
        email: [undefined, [Validators.required, Validators.email]],
      }
    )
  }

  onFormSubmit():void {
    // validate the form
    if(!this.formGroup?.valid){
      return;
    }

    // TODO call login method here
    console.log(this.formGroup.value);
    this.onRegister(this.formGroup.value)
  }

  public onRegister(user: RegisterRequest): void {
    this.subscriptions.push(
      this.authService.register(user).subscribe({
        next: (response: AuthResponse) => {
          console.log("registered");
          console.log(response.token);
          // TODO get the token from the response object and store it inside local storage
          this.authService.storeTokenInLocalStorage(response.token)
          this.router.navigateByUrl('profile');
        },
        error: (httpErrorResponse: HttpErrorResponse) => {
          console.log("an error happened!");
          console.log(httpErrorResponse);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
