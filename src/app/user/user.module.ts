import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../shared/share.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
  ],
})
export class UserModule {}
