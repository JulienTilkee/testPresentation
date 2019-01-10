import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { asyncError } from '../testing/async-observable-helpers';

import { Quote } from '../../src/app/services/quote/quote';
import { QuoteService } from '../../src/app/services/quote/quote.service';
import { asyncData } from 'unit/testing/async-observable-helpers';

describe('QuoteService (using spies)', () => {
    let httpClientSpy: {get: jasmine.Spy};
    let quoteService: QuoteService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        quoteService = new QuoteService(<any> httpClientSpy);
    });

    it('should return expected quotes (HttpClient called once)', () => {
        const expectedQuotes: Quote[] =
            [{id: 1 , quote: 'A'}];
        httpClientSpy.get.and.returnValue(expectedQuotes);
        quoteService.getQuote().subscribe(
            quotes => expect(quotes).toBe(expectedQuotes[0].quote),
            fail
        )
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404,
            statusText: 'Not Found'
        });
        
        httpClientSpy.get.and.returnValue((errorResponse));
 
        quoteService.getQuote().subscribe(
            quote => console.log('QUOTE 2 : ' + quote),
            error  => expect(error).toBe('Cannot get Tilkee quotes from the server')
        );
    });
});