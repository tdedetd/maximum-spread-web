import { Graph } from '../models/geometry/graph.interface';
import { validateLevel } from './utils/validate-level';

export class MaximumSpreadGame {

  /** Width in meters */
  public readonly gameWidth = 40;

  /** Height in meters */
  public readonly gameHeight = 30;

  constructor(
    public readonly level: Graph,
  ) {
    validateLevel(level);
  }
}
