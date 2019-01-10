import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from '../../src/app/components/home/home.component';
import { QuoteComponent } from '../../src/app/components/quote/quote.component';
import { QuoteService } from '../../src/app/services/quote/quote.service';
import { HttpClientModule } from '@angular/common/http';
import { HighlightDirective } from 'src/app/directives/highlight.directive';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        QuoteComponent,
        HighlightDirective
      ],
      providers: [
        QuoteService
      ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a <i> tag to receve quote', () => {
    expect(element.querySelector('i')).toBeTruthy();
  });


});
