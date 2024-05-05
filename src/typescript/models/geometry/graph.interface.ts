import { Point } from './point.interface';

export interface Graph {
  vertices: Point[];
  edges: [number, number][];
}
