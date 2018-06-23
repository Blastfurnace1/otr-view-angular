import { TestBed, inject } from '@angular/core/testing';

import { AudiofileService } from './audiofile.service';

describe('AudiofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudiofileService]
    });
  });

  it('should be created', inject([AudiofileService], (service: AudiofileService) => {
    expect(service).toBeTruthy();
  }));
});
