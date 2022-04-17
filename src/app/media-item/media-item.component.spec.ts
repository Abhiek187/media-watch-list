import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteDirective } from '../favorite.directive';

import { MediaItemComponent } from './media-item.component';

describe('MediaItemComponent', () => {
  let component: MediaItemComponent;
  let fixture: ComponentFixture<MediaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaItemComponent, FavoriteDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemComponent);
    component = fixture.componentInstance;
    component.mediaItem = {
      id: 5,
      name: 'Happy Joe: Cheery Road',
      medium: 'Movies',
      category: 'Action',
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
