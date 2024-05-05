import { LevelMaximumSpreadError } from './level-maximum-spread-error';

export class IsolatedVertexLevelMaximumSpreadError extends LevelMaximumSpreadError {
  constructor(message?: string) {
    super(message);
    this.name = 'IsolatedVertexLevelMaximumSpreadError';
  }
}
