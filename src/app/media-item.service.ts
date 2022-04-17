import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export type MediaItem = {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: number | null;
  watchedOn: number | null;
  isFavorite: boolean;
};

export type MediaItemResponse = {
  mediaItems: MediaItem[];
};

// Register this service in the app module to be injected in other components
@Injectable({
  providedIn: 'root',
})
export class MediaItemService {
  constructor(private http: HttpClient) {}

  get(medium: string): Observable<MediaItem[]> {
    // Define the query parameters for the request
    const getOptions = {
      params: { medium },
    };
    // If the medium is invalid, response.mediaItems will be empty
    return this.http.get<MediaItemResponse>('mediaitems', getOptions).pipe(
      map((response) => response.mediaItems),
      catchError(this.handleError)
    );
  }

  add(mediaItem: MediaItem): Observable<Object> {
    return this.http
      .post('mediaitems', mediaItem)
      .pipe(catchError(this.handleError));
  }

  delete(mediaItem: MediaItem): Observable<Object> {
    return this.http
      .delete(`mediaitems/${mediaItem.id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error.message);
    return throwError(() => 'A data error occurred, please try again.');
  }
}
