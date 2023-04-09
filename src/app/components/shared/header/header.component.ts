import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  username: string = '';
  showMenu = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    if (this.isLoggedIn) {
      const username = this.authService.getLoggedInUsername();
      if (username) {
        this.username = username;
      }
    }
  }


  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
