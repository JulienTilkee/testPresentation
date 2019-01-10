import { TestBed } from '@angular/core/testing';
import { TestService } from '../../src/app/services/test.service';

describe('TestService', () => {

  // let testService: TestService;
  let mockTestService: any;

  beforeEach(() => {
    mockTestService = {
      angular: 'Angular',
      doSomething: () => 42
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: TestService, value: mockTestService }
      ]
    });

  });

  it('should be created', () => {
    expect(TestService).toBeTruthy();
  });

  it('test d\'un composant', () => {
    mockTestService.doSomething();
  });
});
