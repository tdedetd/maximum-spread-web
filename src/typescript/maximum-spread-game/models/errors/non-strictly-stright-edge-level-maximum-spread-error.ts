import { LevelMaximumSpreadError } from './level-maximum-spread-error';

export class NonStrictlyStrightEdgeLevelMaximumSpreadError extends LevelMaximumSpreadError {
  constructor(message?: string) {
    super(message);
    this.name = 'NonStrictlyStrightEdgeLevelMaximumSpreadError';
  }
}
