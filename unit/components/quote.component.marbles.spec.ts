import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { cold, getTestScheduler } from 'jasmine-marbles';

import { QuoteService } from '../../src/app/services/quote/quote.service';
import { QuoteComponent } from '../../src/app/components/quote/quote.component';
import { HighlightDirective } from 'src/app/directives/highlight.directive';

describe('QuoteComponent (using marbes)', () => {
    let component: QuoteComponent;
    let fixture: ComponentFixture<QuoteComponent>;
    let getQuoteSpy: jasmine.Spy;
    let quoteEl: HTMLElement;
    let testQuote: string;

    // Fonction permettant de récupérer la valeur du message d'erreur de l'élément
    // Un *ngIf le maintient hors du DOM sauf en cas d'erreur
    const errorMessage = () => {
        const el = fixture.nativeElement.querySelector('.error');
        return el ? el.textContent : null;
    };

    beforeEach( () => {
        // Créé un fake QuoteService object avec un spy `getQuote()`
        const quoteService = jasmine.createSpyObj('QuoteService', ['getQuote']);
        getQuoteSpy = quoteService.getQuote;

        TestBed.configureTestingModule({
            declarations: [ QuoteComponent, HighlightDirective ],
            providers: [
                { provide: QuoteService, useValue: quoteService }
            ]
        });

        fixture = TestBed.createComponent(QuoteComponent);
        component = fixture.componentInstance;
        quoteEl = fixture.nativeElement.querySelector('.quote');
        testQuote = 'Test Quote';
    });

    // Test asynchrone qui simule un comportement async
    it('should show quote after getQuote (marbles)', () => {
        const q = cold('---x|', { x: testQuote });
        getQuoteSpy.and.returnValue(q);

        fixture.detectChanges();
        expect(quoteEl.textContent).toBe('...');

        getTestScheduler().flush();

        fixture.detectChanges();
        expect(quoteEl.textContent).toBe(testQuote);
        expect(errorMessage()).toBeNull();
    });

    it('should display error message when QuoteService fails', fakeAsync(() => {
        const q = cold('---#|', null, new Error('QuoteService test failure'));
        getQuoteSpy.and.returnValue(q);
        
        fixture.detectChanges();
        expect(quoteEl.textContent).toBe('...');
        
        getTestScheduler().flush();
        
        // Le composant montre une erreur après un setTimeout()
        tick();
        fixture.detectChanges();

        expect(errorMessage()).toMatch(/test failure/);
        expect(quoteEl.textContent).toBe('...');
    }));
});