import { InMemoryDbService } from 'angular-in-memory-web-api';
import { QUOTES } from './quote/quote.data';

const maxQuotes = Infinity;

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {quotes: QUOTES.slice(0, maxQuotes)};
  }
}
