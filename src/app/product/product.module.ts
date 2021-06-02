import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ConvertToSpacePipe } from '../shared/convert-to-space.pipe';
import { StarComponent } from '../shared/star/star.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailGuard } from './product-detail/product-detail.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    ConvertToSpacePipe,
    StarComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
  ],
})
export class ProductModule {}
