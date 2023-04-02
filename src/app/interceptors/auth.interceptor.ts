import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environment/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly apiUrl = environment.apiUrl;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes(`${this.apiUrl}/auth/login`)){ return next.handle(request); }
    if (request.url.includes(`${this.apiUrl}/auth/register`)){ return next.handle(request); }

    this.authService.loadToken();
    const token = this.authService.getToken();
    console.log(token);
    const goRequest = request.clone({ setHeaders: {Authorization: `Bearer ${token}`}})
    return next.handle(goRequest)
  }
}
