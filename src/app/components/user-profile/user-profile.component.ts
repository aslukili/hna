import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { User } from 'src/app/model/User';
import { SubmissionService } from 'src/app/services/submission.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  following = false;
  user: User | undefined;
  posts: Post[] = [];

    constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private postService: SubmissionService
    ) { }

    ngOnInit(): void {
      const username = this.route.snapshot.paramMap.get('username');

      // Check if the authenticated user is following the user whose profile is being viewed
      this.userService.getLoggedInUser().subscribe(
        (authUser) => {
          this.following = authUser.following.some((u) => u.username === username);
        }
      );
      this.getUserInfo();
      this.getUserPosts();
    }


    getUserInfo(): void {
const username = this.route.snapshot.paramMap.get('username');
      if (username == null) {
        console.log("username is null");
        return;
      }
      this.userService.getUserByUsername(username).subscribe({
        next: (user) => {
          console.log("sucess!");
          console.log(user);
          this.user = user;
        }, 
        error: (error) => {
          console.log("error");
          console.error(error);
        }
      });
    }

    getUserPosts(): void {
      const username = this.route.snapshot.paramMap.get('username');
      if (username == null) {
        console.log("username is null");
        return;
      }
      this.postService.getPostsOfUser(username).subscribe({
        next: (posts: Post[]) => {
          console.log("sucess!");
          console.log(posts);
          this.posts = posts;
        }, 
        error: (error: HttpErrorResponse) => {
          console.log("error");
          console.error(error);
        }
      });
    }

    followUser(userId: number): void {
      this.userService.followUser(userId).subscribe({
        next: () => {
          this.following = true;
        console.log("followed user")
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    
    unfollowUser(userId: number): void {
      this.userService.unfollowUser(userId).subscribe({
        next: () => {
          console.log("unfollowed user")
          this.following = false;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    
}
