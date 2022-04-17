import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { lookupLists, lookupListToken } from '../providers';

import { MediaItemFormComponent } from './media-item-form.component';

describe('MediaItemFormComponent', () => {
  let component: MediaItemFormComponent;
  let fixture: ComponentFixture<MediaItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaItemFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [{ provide: lookupListToken, useValue: lookupLists }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
