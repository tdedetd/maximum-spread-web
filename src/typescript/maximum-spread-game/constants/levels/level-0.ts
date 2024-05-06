import { Graph } from '../../../models/geometry/graph.interface';

export const level0: Graph = {
  vertices: [
    { x: 15, y: 14 },
    { x: 21, y: 14 },
    { x: 34, y: 14 },
    { x: 21, y: 28 },
    { x: 12, y: 28 },
    { x: 34, y: 5 },
  ],
  edges: [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 4],
    [2, 5],
  ]
};
