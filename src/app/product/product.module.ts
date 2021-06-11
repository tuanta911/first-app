import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { ShareModule } from '../shared/share.module';
import { ProductResolver } from './product-resolver.service';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags/product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info/product-edit-info.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditTagsComponent,
    ProductEditInfoComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
        resolve: { resolveData: ProductResolver },
      },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
        resolve: { resolveData: ProductResolver },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info',
            component: ProductEditInfoComponent,
            resolve: { product: ProductResolver },
          },
          {
            path: 'tags',
            component: ProductEditTagsComponent,
          },
        ],
      },
    ]),
    ShareModule,
  ],
})
export class ProductModule {}
