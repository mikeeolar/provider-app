import { TestBed } from '@angular/core/testing';

import { JobRequestsService } from './job-requests.service';

describe('JobRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobRequestsService = TestBed.get(JobRequestsService);
    expect(service).toBeTruthy();
  });
});
