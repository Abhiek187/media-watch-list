import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaItem, MediaItemService } from '../media-item.service';

@Component({
  selector: 'mw-media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.css'],
})
export class MediaItemListComponent implements OnInit {
  medium = '';
  mediaItems: MediaItem[] = [];

  constructor(
    private mediaItemService: MediaItemService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // paramMap contains all the param variables in the app routing module
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      let medium = paramMap.get('medium');

      if (medium === null || medium?.toLowerCase() === 'all') {
        medium = '';
      }

      this.getMediaItems(medium);
    });
  }

  // Send a DELETE request to remove a media item, then refresh the mediaItems property
  onMediaItemDelete(mediaItem: MediaItem) {
    this.mediaItemService.delete(mediaItem).subscribe(() => {
      this.getMediaItems(this.medium);
    });
  }

  // Send a GET request to filter the media items by medium
  getMediaItems(medium: string) {
    this.medium = medium;
    this.mediaItemService.get(medium).subscribe((mediaItems) => {
      this.mediaItems = mediaItems;
    });
  }
}
