import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from '../../src/app/components/welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login input', () => {
    const inputList = element.querySelectorAll('input');
    expect(inputList[0]).toBeTruthy();
  });

  it('should have a password input', () => {
    const inputList = element.querySelectorAll('input');
    expect(inputList[1]).toBeTruthy();
  });

  it('should have a <button> tag', () => {
    expect(element.querySelector('button')).toBeTruthy();
  });

  it('should manage login behavior', () => {
    expect(component.isLoginMessageVisible).toBeFalsy();
    component.onLoginClick();
    expect(component.login.value).toBeFalsy();
    expect(component.password.value).toBeFalsy();
    component.login.setValue('login');
    component.password.setValue('password');
    component.onLoginClick();
    expect(component.isLoginMessageVisible).toBeTruthy();
    component.login.setValue('test');
    component.password.setValue('password');
    component.onLoginClick();
    expect(component.isLoginMessageVisible).toBeTruthy();
    component.login.setValue('login');
    component.password.setValue('1234');
    component.onLoginClick();
    expect(component.isLoginMessageVisible).toBeTruthy();
    component.login.setValue('test');
    component.password.setValue('1234');
    component.onLoginClick();
    expect(component.isLoginMessageVisible).toBeFalsy();
  });
});
