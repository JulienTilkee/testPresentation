import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  count = 0;

  constructor() { }

  incrementCount() {
    this.count++;
  }
}
