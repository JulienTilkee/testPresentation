import { Quote } from './quote';

export const QUOTES: Quote[] = [
  'What does the fox say ?',
  'No matter the bugs, no matter the issues, no matter what, K33P CODING.',
  'Devenez plus efficace en trackant vos documents.',
  'Augmentez votre efficacité en intégrant Tilkee à votre quotidien.'
]
.map((q, i) => ({ id: i + 1, quote: q }));
