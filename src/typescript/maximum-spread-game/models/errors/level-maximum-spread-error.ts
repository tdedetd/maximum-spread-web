import { MaximumSpreadError } from './maximum-spread-error';

export class LevelMaximumSpreadError extends MaximumSpreadError {
  constructor(message?: string) {
    super(message);
    this.name = 'LevelMaximumSpreadError';
  }
}
