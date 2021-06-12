import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShareModule } from '../shared/share.module';

import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild([
      {
        path: 'messages',
        component: MessageComponent,
        outlet: 'popup'
      }
    ])
  ],
  declarations: [
    MessageComponent
  ]
})
export class MessageModule { }
