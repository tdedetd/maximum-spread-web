import { NumberIsNotNormalizedError } from '../models/errors/number-is-not-normalized-error';
import { Graph } from '../models/geometry/graph.interface';
import { EntryPoint } from './models/entry-point.interface';
import { Player } from './models/player.interface';
import { validateLevel } from './utils/validate-level';

export class MaximumSpreadGame {

  /** Width in meters */
  public readonly fieldWidth = 40;

  /** Height in meters */
  public readonly fieldHeight = 30;

  private players: Player[] = [];

  constructor(
    public readonly level: Graph,
  ) {
    validateLevel(level);
  }

  public addPlayer(entryPoint: EntryPoint): void {
    if (entryPoint.position < 0 || entryPoint.position > 1) {
      throw new NumberIsNotNormalizedError(`Potition on pipe is not normalized: ${entryPoint.position}`);
    }

    this.players.push({ entryPoint });
  }
}
