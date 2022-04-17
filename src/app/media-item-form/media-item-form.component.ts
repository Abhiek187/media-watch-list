import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MediaItem, MediaItemService } from '../media-item.service';
import { LookupList, lookupListToken } from '../providers';

@Component({
  selector: 'mw-media-item-form',
  templateUrl: './media-item-form.component.html',
  styleUrls: ['./media-item-form.component.css'],
})
export class MediaItemFormComponent implements OnInit {
  form!: FormGroup;

  // Only set variables public if they need to be accessed by the template or other classes
  constructor(
    private formBuilder: FormBuilder,
    private mediaItemService: MediaItemService,
    @Inject(lookupListToken) public lookupLists: LookupList,
    private router: Router
  ) {}

  ngOnInit() {
    // Define all the form elements, their default values, and their validators
    this.form = this.formBuilder.group({
      medium: this.formBuilder.control('Movies'),
      name: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          // Valid name characters: a-z, A-Z, 0-9, _, -, \r, \n, \t, \f, space, and /
          Validators.pattern(/^[\w\-\s\/]+$/),
        ])
      ),
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator),
    });
  }

  yearValidator(control: AbstractControl): ValidationErrors | null {
    const yearInput = control.value as string;

    if (yearInput.trim().length === 0) {
      return null; // null === valid
    }

    // Only accept years between 1800 and 2500, inclusive
    const year = parseInt(yearInput);
    const minYear = 1800;
    const maxYear = 2500;

    if (year >= minYear && year <= maxYear) {
      return null;
    } else {
      // Use the minYear and maxYear variables to explain the error
      return {
        year: {
          min: minYear,
          max: maxYear,
        },
      };
    }
  }

  onSubmit(mediaItem: MediaItem) {
    // Send a POST request to create a new media item and navigate to its medium page
    this.mediaItemService.add(mediaItem).subscribe(() => {
      this.router.navigate(['/', mediaItem.medium]);
    });
  }
}
