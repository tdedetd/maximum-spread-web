import { Graph } from '../models/geometry/graph.interface';
import { validateLevel } from './utils/validate-level';

export class MaximumSpreadGame {

  /** Width in meters */
  public readonly fieldWidth = 40;

  /** Height in meters */
  public readonly fieldHeight = 30;

  constructor(
    public readonly level: Graph,
  ) {
    validateLevel(level);
  }
}
