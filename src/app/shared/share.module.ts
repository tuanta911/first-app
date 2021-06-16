import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacePipe } from './convert-to-space.pipe';
import { CriteriaComponent } from './criteria/criteria.component';

@NgModule({
  declarations: [StarComponent, ConvertToSpacePipe, CriteriaComponent],
  imports: [CommonModule, FormsModule],
  exports: [
    StarComponent,
    CriteriaComponent,
    ConvertToSpacePipe,
    CommonModule,
    FormsModule,
  ],
})
export class ShareModule {}
