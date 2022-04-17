import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaItemComponent } from './media-item/media-item.component';
import { MediaItemListComponent } from './media-item-list/media-item-list.component';
import { FavoriteDirective } from './favorite.directive';
import { CategoryListPipe } from './category-list/category-list.pipe';
import { lookupListToken, lookupLists } from './providers';
import { MockXHRBackend } from './mock-xhr-backend';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  // All the custom components, directives, and pipes the app uses
  declarations: [
    AppComponent,
    MediaItemComponent,
    MediaItemListComponent,
    FavoriteDirective,
    CategoryListPipe,
    CategoryListComponent,
  ],
  // Modules the app uses
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  // Service providers that can be injected into any child component
  providers: [
    { provide: lookupListToken, useValue: lookupLists },
    { provide: HttpXhrBackend, useClass: MockXHRBackend },
  ],
  // The root component added to index.html
  bootstrap: [AppComponent],
})
export class AppModule {}
