import { Line } from '../models/geometry/line.type';
import { Point } from '../models/geometry/point.interface';

export function getNearestPointToLine(point: Point, line: Line): Point {
  const isVertical = line[0].x === line[1].x;

  if (isVertical) {
    const yMin = Math.min(line[0].y, line[1].y);
    const yMax = Math.max(line[0].y, line[1].y);
    const y = point.y < yMin
      ? yMin
      : point.y > yMax
      ? yMax
      : point.y;
    return { x: line[0].x, y };
  } else {
    const xMin = Math.min(line[0].x, line[1].x);
    const xMax = Math.max(line[0].x, line[1].x);
    const x = point.x < xMin
      ? xMin
      : point.x > xMax
      ? xMax
      : point.x;
    return { x, y: line[0].y };
  }
}
