import {
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpBackend,
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { MediaItem } from './media-item.service';

// Mock network requests to quickly generate responses
export class MockXHRBackend implements HttpBackend {
  // The hard-coded app data
  private mediaItems: MediaItem[] = [
    {
      id: 1,
      name: 'Firebug',
      medium: 'Series',
      category: 'Science Fiction',
      year: 2010,
      watchedOn: 1294166565384,
      isFavorite: false,
    },
    {
      id: 2,
      name: 'The Small Tall',
      medium: 'Movies',
      category: 'Comedy',
      year: 2015,
      watchedOn: null,
      isFavorite: true,
    },
    {
      id: 3,
      name: 'The Redemption',
      medium: 'Movies',
      category: 'Action',
      year: 2016,
      watchedOn: null,
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Hoopers',
      medium: 'Series',
      category: 'Drama',
      year: null,
      watchedOn: null,
      isFavorite: true,
    },
    {
      id: 5,
      name: 'Happy Joe: Cheery Road',
      medium: 'Movies',
      category: 'Action',
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false,
    },
  ];

  // Generate a response based on the provided request
  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    // A subscriber will receive an update when the next, error, or complete method is called
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (
            request.urlWithParams.indexOf('mediaitems?medium=') >= 0 ||
            request.url === 'mediaitems'
          ) {
            // If there's a medium in the query, filter by that medium
            // Otherwise, view all media items
            let medium = '';
            if (request.urlWithParams.indexOf('?') >= 0) {
              medium = request.urlWithParams.split('=')[1];
              if (medium === 'undefined') {
                medium = '';
              }
            }
            let mediaItems: MediaItem[];
            if (medium.length > 0) {
              mediaItems = this.mediaItems.filter((i) => i.medium === medium);
            } else {
              mediaItems = this.mediaItems;
            }
            responseOptions = {
              body: { mediaItems: JSON.parse(JSON.stringify(mediaItems)) },
              status: 200,
            };
          } else {
            // Get the media item with id (mediaitems/:id)
            let mediaItems: MediaItem[];
            const idToFind = parseInt(request.url.split('/')[1], 10);
            mediaItems = this.mediaItems.filter((i) => i.id === idToFind);
            responseOptions = {
              body: JSON.parse(JSON.stringify(mediaItems[0])),
              status: 200,
            };
          }
          break;
        case 'POST':
          // Create a new media item specified in the request body
          const mediaItem = request.body as MediaItem;
          mediaItem.id = this._getNewId();
          this.mediaItems.push(mediaItem);
          responseOptions = { status: 201 };
          break;
        case 'DELETE':
          // Remove a media item by id (mediaitems/:id)
          const id = parseInt(request.url.split('/')[1], 10);
          this._deleteMediaItem(id);
          responseOptions = { status: 200 };
      }

      // Send the response body to the subscriber and complete the notification
      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {};
    });
  }

  // Remove the media item with the specified id
  _deleteMediaItem(id: number) {
    const mediaItem = this.mediaItems.find((i) => i.id === id);
    if (mediaItem !== undefined) {
      const index = this.mediaItems.indexOf(mediaItem);
      if (index >= 0) {
        this.mediaItems.splice(index, 1);
      }
    }
  }

  // Return the highest id in mediaItems + 1
  _getNewId() {
    if (this.mediaItems.length > 0) {
      return (
        Math.max.apply(
          Math,
          this.mediaItems.map((mediaItem) => mediaItem.id)
        ) + 1
      );
    } else {
      return 1;
    }
  }
}
