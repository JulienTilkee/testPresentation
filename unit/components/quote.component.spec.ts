import { ComponentFixture, TestBed, tick, fakeAsync, async } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { last } from 'rxjs/operators';

import { asyncData, asyncError } from '../testing/async-observable-helpers';

import { QuoteComponent } from "src/app/components/quote/quote.component";
import { QuoteService } from 'src/app/services/quote/quote.service';
import { HighlightDirective } from 'src/app/directives/highlight.directive';

describe('QuoteComponent', () => {
    let component: QuoteComponent;
    let fixture: ComponentFixture<QuoteComponent>;
    let getQuoteSpy: jasmine.Spy;
    let quoteEl: HTMLElement;
    let testQuote: string;
    
    const errorMessage = () => {
        const el = fixture.nativeElement.querySelector('.error');
        return el ? el.textContent : null;
    }
    
    beforeEach(() => {
        testQuote = 'test quote';

        const quoteService = jasmine.createSpyObj('QuoteService', ['getQuote']);
        getQuoteSpy = quoteService.getQuote.and.returnValue( of(testQuote));
    
        TestBed.configureTestingModule({
            declarations: [ QuoteComponent, HighlightDirective ],
            providers: [
                { provide: QuoteService, useValue: quoteService }
            ]
        });

        fixture = TestBed.createComponent(QuoteComponent);
        component = fixture.componentInstance;
        quoteEl = fixture.nativeElement.querySelector('.quote');
    });


    describe('when test with synchronous observable', () => {
        it('should not show quote before OnInit', () => {
            expect(quoteEl.textContent).toBe('');
            expect(errorMessage()).toBeNull();
            expect(getQuoteSpy.calls.any()).toBeFalsy();
        });

        it('should show quote after component initialized', () => {
            fixture.detectChanges();
            expect(quoteEl.textContent).toBe(testQuote);
            expect(getQuoteSpy.calls.any()).toBeTruthy();
        });

        it('should display error when QuoteService fails', fakeAsync(() => {
            getQuoteSpy.and.returnValue(
                throwError('QuoteService test failure')
            );
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(errorMessage()).toMatch(/test failure/);
            expect(quoteEl.textContent).toBe('...');
        }));
    });

    describe('when test with asynchronous observable', () => {
        beforeEach(() => {
            getQuoteSpy.and.returnValue(asyncData(testQuote));
        });
        
        it('should not show quote before OnInit', () => {
            expect(quoteEl.textContent).toBe('');
            expect(errorMessage()).toBeNull();
            expect(getQuoteSpy.calls.any()).toBeFalsy();
        });
        
        it('should still not show quote after component initialized', () => {
            fixture.detectChanges();
            expect(quoteEl.textContent).toBe('...');
            expect(errorMessage()).toBeNull();
            expect(getQuoteSpy.calls.any()).toBeTruthy();
        });

        it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
            fixture.detectChanges();
            expect(quoteEl.textContent).toBe('...');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(quoteEl.textContent).toBe(testQuote);
                expect(errorMessage()).toBeNull();
            });
        }));

        it('should show quote after getQuote (async)', async(() => {
            fixture.detectChanges();
            expect(quoteEl.textContent).toBe('...');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(quoteEl.textContent).toBe(testQuote);
                expect(errorMessage()).toBeNull();
            });
        }));

        it('should show last quote (quote done)', (done: DoneFn) => {
            fixture.detectChanges();
            component.quote.pipe( last() ).subscribe(() => {
                fixture.detectChanges();
                expect(quoteEl.textContent).toBe(testQuote);
                expect(errorMessage()).toBeNull();
                done();
            });
        });

        it('should show quote after getQuote (spy done)', (done: DoneFn) => {
            fixture.detectChanges();
            getQuoteSpy.calls.mostRecent().returnValue.subscribe(() => {
                fixture.detectChanges();
                expect(quoteEl.textContent).toBe(testQuote);
                expect(errorMessage()).toBeNull();
                done();
            })
        });

        it('should display error when QuoteService fails', fakeAsync(() => {
            getQuoteSpy.and.returnValue(asyncError<string>('QuoteService test failure'));
            fixture.detectChanges();
            // Le composant montre une erreur après un setTimeout()
            tick(); 
            // Update du message d'erreur
            fixture.detectChanges();
            expect(errorMessage()).toMatch(/test failure/);
            expect(quoteEl.textContent).toBe('...');
        }));
    });
});