import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaItemListComponent } from './media-item-list/media-item-list.component';

const routes: Routes = [
  {
    path: 'add',
    // Lazy-load the new item module when the path is /add
    loadChildren: () =>
      import('./new-item/new-item.module').then((m) => m.NewItemModule),
  },
  // Capture the medium in the component
  { path: ':medium', component: MediaItemListComponent },
  // pathMatch: prefix will cause an endless loop since all route paths contain an empty string
  { path: '', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // Expose this module to use in the app module
  exports: [RouterModule],
})
export class AppRoutingModule {}
