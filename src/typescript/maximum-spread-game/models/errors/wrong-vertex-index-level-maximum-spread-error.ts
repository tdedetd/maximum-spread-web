import { LevelMaximumSpreadError } from './level-maximum-spread-error';

export class WrongVertexIndexLevelMaximumSpreadError extends LevelMaximumSpreadError {
  constructor(message?: string) {
    super(message);
    this.name = 'WrongVertexIndexLevelMaximumSpreadError';
  }
}
