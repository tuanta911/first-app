import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { ShareModule } from '../shared/share.module';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
    ShareModule,
  ],
})
export class ProductModule {}
