import { Level } from '../models/level';
import { PipeDirections } from '../models/pipe-directions.enum';
import { PipeSides } from '../models/pipe-sides.enum';

export const level0: Level = {
  pipes: [
    {
      direction: PipeDirections.Right,
      head: { x: 10, y: 25 },
      length: 10,
    },
    {
      direction: PipeDirections.Down,
      head: { x: 20, y: 13 },
      length: 12,
    },
    {
      direction: PipeDirections.Right,
      head: { x: 12, y: 13 },
      length: 8,
    },
    {
      direction: PipeDirections.Right,
      head: { x: 20, y: 13 },
      length: 11,
    },
  ],
  connections: [
    [
      { index: 0, side: PipeSides.Tail },
      { index: 1, side: PipeSides.Tail },
    ],
    [
      { index: 1, side: PipeSides.Head },
      { index: 2, side: PipeSides.Tail },
      { index: 3, side: PipeSides.Head },
    ],
  ],
};
