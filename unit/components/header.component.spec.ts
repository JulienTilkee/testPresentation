import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../../src/app/components/header/header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "Tilkee tests présentation" as title', () => {
    expect(component.title).toBe('Tilkee tests présentation');
  });

  it('should manage the button to change header\'s colors', () => {
    expect(component.color.white).toBe('rgba(255, 255, 255, 1)');
    expect(component.color.black).toBe('rgba(0, 0, 0, 1)');
    expect(component.color.temp).toBe('');
    component.invertColors();
    expect(component.color.white).toBe('rgba(0, 0, 0, 1)');
    expect(component.color.black).toBe('rgba(255, 255, 255, 1)');
    expect(component.color.temp).toBe('rgba(255, 255, 255, 1)');
  });
});
