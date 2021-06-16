import { SelectiveStrategyService } from './selective-strategy.service';
import { WelcomeComponent } from './home/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './user/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: 'welcome', component: WelcomeComponent },
        {
          path: 'products',
          //canActivate: [AuthGuard],
          data: { preload: true },
          loadChildren: () =>
            import('./product/product.module').then((m) => m.ProductModule),
        },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', component: WelcomeComponent },
      ],
      { preloadingStrategy: SelectiveStrategyService }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
