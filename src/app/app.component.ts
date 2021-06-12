import { MessageService } from './message/message.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
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
  loading: boolean = true;

  constructor(private router: Router, private messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  IsMessageDisplayed(): boolean{
    return this.messageService.isDisplayed;
  }

  logOut(): void {
    this.router.navigate(['/welcome']);
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  ClickMessage(): void{
    this.messageService.isDisplayed = !this.messageService.isDisplayed
  }
}
