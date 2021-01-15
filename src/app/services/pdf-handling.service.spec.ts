import { TestBed } from '@angular/core/testing';

import { PdfHandlingService } from './pdf-handling.service';

describe('PdfHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfHandlingService = TestBed.get(PdfHandlingService);
    expect(service).toBeTruthy();
  });
});
