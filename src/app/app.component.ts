import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
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
