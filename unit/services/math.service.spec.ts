import { inject, TestBed } from '@angular/core/testing';

import { MathService } from '../../src/app/services/math.service';

describe('MathService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MathService]
    });
  });

  it('Le service doit être injecté', inject([MathService], (mathService: MathService) => {
    expect(mathService).toBeTruthy();
  }));

  it(`La méthode incrementCount doit incrémenter la propriété count`, () => {
    const mathService = new MathService;

    mathService.incrementCount();
    expect(mathService.count).toEqual(1);
    mathService.incrementCount();
    expect(mathService.count).toEqual(2);
  });
});
