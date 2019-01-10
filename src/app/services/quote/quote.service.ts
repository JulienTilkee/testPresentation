import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { switchMap, map, retryWhen, take, concat } from 'rxjs/operators';

import { Quote } from './quote';

@Injectable()
export class QuoteService {

  constructor(private http:HttpClient) { }

  private nextId = 1;

  getQuote(): Observable<string> {
    return Observable.create(observer => observer.next(this.nextId++)).pipe(
      switchMap((id: number) => this.http.get<Quote>(`api/quotes/${id}`)),
      map((q: Quote) => q.quote),
      retryWhen(errors => errors.pipe(
        switchMap((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.nextId = 1;
            return of(null);
          }
          return throwError('Cannot get Tilkee quotes from the server');
        }),
        take(2),
        concat(throwError('There are no Tilkee quotes'))
      ))
    );
  }
}
