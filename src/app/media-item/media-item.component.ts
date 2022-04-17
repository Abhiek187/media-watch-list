import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MediaItem } from '../media-item.service';

@Component({
  selector: 'mw-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css'],
})
export class MediaItemComponent {
  @Input() mediaItem!: MediaItem;
  @Output() delete = new EventEmitter();

  onDelete() {
    // Send the media item to the media item list component as part of the $event object
    this.delete.emit(this.mediaItem);
  }
}
