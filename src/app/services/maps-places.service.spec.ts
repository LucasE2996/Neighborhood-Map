import { TestBed } from '@angular/core/testing';

import { MapsPlacesService } from './maps-places.service';

describe('MapsPlacesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapsPlacesService = TestBed.get(MapsPlacesService);
    expect(service).toBeTruthy();
  });
});
