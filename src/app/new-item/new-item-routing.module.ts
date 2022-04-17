import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaItemFormComponent } from '../media-item-form/media-item-form.component';

const routes: Routes = [{ path: '', component: MediaItemFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewItemRoutingModule {}
