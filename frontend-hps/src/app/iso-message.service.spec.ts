import { TestBed } from '@angular/core/testing';

import { IsoMessageService } from './iso-message.service';

describe('IsoMessageService', () => {
  let service: IsoMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsoMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
