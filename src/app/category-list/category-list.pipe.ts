import { Pipe, PipeTransform } from '@angular/core';
import { MediaItem } from '../media-item.service';

@Pipe({
  name: 'categoryList',
})
export class CategoryListPipe implements PipeTransform {
  transform(mediaItems: MediaItem[]): Set<string> {
    // Create a list of distinct category names from the given media items list
    const categories = new Set<string>();
    mediaItems.forEach((mediaItem) => categories.add(mediaItem.category));
    return categories;
  }
}
