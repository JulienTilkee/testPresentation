import { HighlightDirective } from '../../src/app/directives/highlight.directive';
import { TestComponent } from './test.component';

import { TestBed } from '@angular/core/testing';

describe('HighLightDirective', () => {
  let fixture;
  beforeEach( () => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        HighlightDirective
      ]
    }).createComponent(TestComponent);
    fixture.detectChanges();
  });

  it(`should have blue <div>`, () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    const bgColor = div.style.backgroundColor;
    expect(bgColor).toBe('blue');
  });
});
