import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MediaItemService } from './media-item.service';

describe('MediaItemService', () => {
  let service: MediaItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MediaItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
