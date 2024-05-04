import { Pipe } from './pipe.type';
import { PipesConnection } from './pipes-connection.interface';

export interface Level {
  pipes: Pipe[];
  connections: PipesConnection[][];
}
