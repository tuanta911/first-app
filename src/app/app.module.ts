import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ConvertToSpacePipe } from './shared/convert-to-space.pipe';
import { StarComponent } from './shared/star/star.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacePipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
