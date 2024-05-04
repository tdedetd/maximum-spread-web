import { Point } from '../../utils/geometry/point.interface';
import { PipeDirections } from './pipe-directions.enum';

export interface Pipe {
  head: Point;
  direction: PipeDirections;
  length: number;
}
