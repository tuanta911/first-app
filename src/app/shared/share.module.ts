import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacePipe } from './convert-to-space.pipe';

@NgModule({
  declarations: [StarComponent, ConvertToSpacePipe],
  imports: [CommonModule],
  exports: [StarComponent, ConvertToSpacePipe, CommonModule, FormsModule],
})
export class ShareModule {}
