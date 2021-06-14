import { WelcomeComponent } from './home/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
