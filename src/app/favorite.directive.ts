import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  // Apply this directive on an HTML element with an mwFavorite attribute
  selector: '[mwFavorite]',
})
export class FavoriteDirective {
  // Toggle the CSS classes based on whether the following properties are true
  @HostBinding('class.is-favorite') isFavorite = true;
  @HostBinding('class.is-favorite-hovering') hovering = false;

  // Toggle the heart when hovering over it
  @HostListener('mouseenter') onMouseEnter() {
    this.hovering = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.hovering = false;
  }

  // Show the favorite heart based on the input provided in the media item component
  @Input() set mwFavorite(value: boolean) {
    this.isFavorite = value;
  }
}
