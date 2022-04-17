import { InjectionToken } from '@angular/core';

export type LookupList = {
  mediums: string[];
};

// Injection tokens are easier to reference than string literals
export const lookupListToken = new InjectionToken<LookupList>(
  'lookupListToken'
);

// The medium options to display in the media item form dropdown
export const lookupLists: LookupList = {
  mediums: ['Movies', 'Series'],
};
