import { Graph } from '../models/geometry/graph.interface';
import { Point } from '../models/geometry/point.interface';
import { validateLevel } from './utils/validate-level';

export class MaximumSpreadGame {

  /** Width in meters */
  public readonly gameWidth = 40;

  /** Height in meters */
  public readonly gameHeight = 30;

  constructor(
    private readonly container: HTMLDivElement,
    private readonly level: Graph,
  ) {
    validateLevel(level);
  }

  public drawPipes(): void {
    const points = this.level.vertices;
    this.level.edges
      .map<[Point, Point]>((edge) => [points[edge[0]], points[edge[1]]])
      .forEach((edge) => {
        const minX = Math.min(edge[0].x, edge[1].x);
        const maxX = Math.max(edge[0].x, edge[1].x);
        const minY = Math.min(edge[0].y, edge[1].y);
        const maxY = Math.max(edge[0].y, edge[1].y);

        const pipeElement = document.createElement('div');
        pipeElement.classList.add('pipe');
        pipeElement.style.left = `${(minX / this.gameWidth * 100)}%`;
        pipeElement.style.top = `${(minY / this.gameHeight * 100)}%`;
        pipeElement.style.width = `${(maxX - minX) / this.gameWidth * 100}%`;
        pipeElement.style.height = `${(maxY - minY) / this.gameHeight * 100}%`;

        this.container.appendChild(pipeElement);
      });
  }
}
