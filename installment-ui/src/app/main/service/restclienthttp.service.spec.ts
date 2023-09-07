import { TestBed } from '@angular/core/testing';

import { RestclienthttpService } from './restclienthttp.service';

describe('RestclienthttpService', () => {
  let service: RestclienthttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestclienthttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
