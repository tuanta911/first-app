import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product/product-data';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//feature
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MessageModule,
    UserModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
