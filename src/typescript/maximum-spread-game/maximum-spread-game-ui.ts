import { Graph } from '../models/geometry/graph.interface';
import { Point } from '../models/geometry/point.interface';
import { generateStartTarget } from '../utils/generate-start-target';
import { getDistance } from '../utils/get-distance';
import { getNearestPointToLine } from '../utils/get-nearest-point-to-line';
import { MaximumSpreadGame } from './maximum-spread-game';

export class MaximumSpreadGameUi {
  private readonly startTargetLength: number = 40;
  private startTarget: HTMLDivElement | null = null;

  private get level(): Graph {
    return this.game.level;
  }

  constructor(
    private readonly game: MaximumSpreadGame,
    private readonly container: HTMLDivElement
  ) {
    this.container.innerHTML = '';
    this.createMouseOverlay();
  }

  public clearStartTarget(): void {
    if (this.startTarget) {
      this.container.removeChild(this.startTarget);
      this.startTarget = null;
    }
  }

  public drawVerticesIndexes(): void {
    this.level.vertices.forEach((vertex, index) => {
      const label = document.createElement('p');
      label.classList.add('vertex-index');
      label.innerText = String(index);
      label.style.left = `calc(${vertex.x / this.game.gameWidth * 100}% + 4px)`;
      label.style.top = `calc(${vertex.y / this.game.gameHeight * 100}% + 10px)`;
      this.container.appendChild(label);
    });
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
        pipeElement.style.left = `${(minX / this.game.gameWidth * 100)}%`;
        pipeElement.style.top = `${(minY / this.game.gameHeight * 100)}%`;
        pipeElement.style.width = `${(maxX - minX) / this.game.gameWidth * 100}%`;
        pipeElement.style.height = `${(maxY - minY) / this.game.gameHeight * 100}%`;

        this.container.appendChild(pipeElement);
      });
  }

  public placeStartTarget(offsetX: number, offsetY: number): void {
    if (!this.startTarget) {
      this.startTarget = generateStartTarget(this.startTargetLength);
      this.container.appendChild(this.startTarget);
    }

    const gameX = offsetX / this.container.clientWidth * this.game.gameWidth;
    const gameY = offsetY / this.container.clientHeight * this.game.gameHeight;
    const targetCoords = this.getNearestPointToPipes({ x: gameX, y: gameY });
    const pxX = targetCoords.x / this.game.gameWidth * this.container.clientWidth - this.startTargetLength / 2;
    const pxY = targetCoords.y / this.game.gameHeight * this.container.clientHeight - this.startTargetLength / 2;
    this.startTarget.style.transform = `translate(${pxX}px, ${pxY}px)`;
  }

  private createMouseOverlay(): void {
    const overlay = document.createElement('div');
    overlay.classList.add('mousemove-overlay');
    this.container.appendChild(overlay);
  }

  private getNearestPointToPipes(point: Point): Point {
    let minDistance = 9999999;
    let nearestPointToPipes: Point = point;

    this.level.edges.forEach((edge) => {
      const nearestPointToCurrentPipe = getNearestPointToLine(
        point,
        [this.level.vertices[edge[0]], this.level.vertices[edge[1]]]
      );
      const distance = getDistance(point, nearestPointToCurrentPipe);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPointToPipes = nearestPointToCurrentPipe;
      }
    });

    return nearestPointToPipes;
  }
}
