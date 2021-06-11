import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pageTitle = 'Tuan Thai Product Managerment';
  userName: string = 'Tuan Thai';
  isLoggedIn: boolean = false;
  constructor(private router: Router) {}

  logOut(): void {
    this.router.navigate(['/welcome']);
  }
}
