import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

import { QuoteService } from '../../services/quote/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  errorMessage: string;
  quote: Observable<string>

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.getQuote();
  }

  getQuote() {
      this.errorMessage = '';
      this.quote = this.quoteService.getQuote().pipe(
        startWith('...'),
        catchError( (err: any) => {
          setTimeout(() => {
            this.errorMessage = err.message || err.toString();
          });
          return of('...');
        })
      )
  }

}
