import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthResponse } from 'src/app/model/AuthResponse';
import { AuthRequest } from 'src/app/model/AuthRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formGroup: FormGroup | undefined;
  private subscriptions: Subscription[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ){

  }

  ngOnInit(): void {
    if(this.authService.isUserLoggedIn()){
      this.router.navigateByUrl('/profile'); 
    }else{
        this.router.navigateByUrl('/login');
    }


    this.formGroup = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required]
    })
  }

  onFormSubmit():void {
    // validate the form
    if(!this.formGroup?.valid){
      return;
    }

    // TODO call login method here
    console.log(this.formGroup.value);
    console.log("logged in");
    this.onLogin(this.formGroup.value);
  }

  public onLogin(userAuthRequest: AuthRequest): void {
    this.subscriptions.push(
      this.authService.login(userAuthRequest).subscribe({
        next: (response: AuthResponse) => {
          console.log("logged in");
          console.log(response.token);
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

}
