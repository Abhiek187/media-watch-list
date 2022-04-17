import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewItemRoutingModule } from './new-item-routing.module';
import { MediaItemFormComponent } from '../media-item-form/media-item-form.component';

@NgModule({
  declarations: [MediaItemFormComponent],
  imports: [CommonModule, NewItemRoutingModule, ReactiveFormsModule],
})
export class NewItemModule {}
