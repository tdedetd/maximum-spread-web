import { Graph } from '../models/geometry/graph.interface';
import { Point } from '../models/geometry/point.interface';
import { getDistance } from '../utils/get-distance';
import { getNearestPointToLine } from '../utils/get-nearest-point-to-line';
import { MaximumSpreadGame } from './maximum-spread-game';
import { EntryPoint } from './models/entry-point.interface';

export class EntryPointDetails {
  private edgeIndex: number | null = null;
  private mark: HTMLDivElement | null = null;
  private nearestPointToPipes: Point | null = null;

  private get level(): Graph {
    return this.game.level;
  }

  constructor(
    public readonly markSize: number,
    private readonly game: MaximumSpreadGame,
    private readonly container: HTMLDivElement,
  ) {}

  public clear(): void {
    if (this.mark) {
      this.container.removeChild(this.mark);
      this.edgeIndex = null;
      this.mark = null;
      this.nearestPointToPipes = null;
    }
  }

  public getEntryPoint(): EntryPoint | null {
    if (this.edgeIndex === null || !this.nearestPointToPipes) {
      return null;
    }

    const edge = this.level.edges[this.edgeIndex];
    const edgeVertices: [Point, Point] = [this.level.vertices[edge[0]], this.level.vertices[edge[1]]];
    const position = (getDistance(edgeVertices[0], this.nearestPointToPipes))
      / (getDistance(edgeVertices[0], edgeVertices[1]));

    return { pipeIndex: this.edgeIndex, position };
  }

  public placeMark(offsetX: number, offsetY: number): void {
    if (!this.mark) {
      this.mark = this.generateMark();
      this.container.appendChild(this.mark);
    }

    const gameX = offsetX / this.container.clientWidth * this.game.fieldWidth;
    const gameY = offsetY / this.container.clientHeight * this.game.fieldHeight;

    this.updateNearestPointToPipes({ x: gameX, y: gameY });
    if (this.nearestPointToPipes) {
      const pxX = this.nearestPointToPipes.x / this.game.fieldWidth * this.container.clientWidth - this.markSize / 2;
      const pxY = this.nearestPointToPipes.y / this.game.fieldHeight * this.container.clientHeight - this.markSize / 2;
      this.mark.style.transform = `translate(${pxX}px, ${pxY}px)`;
    }
  }

  private generateMark(): HTMLDivElement {
    const startTarget = document.createElement('div');
    startTarget.classList.add('entry-point-mark');

    const width = `${this.markSize}px`;
    startTarget.style.width = width;
    startTarget.style.height = width;
    return startTarget;
  }

  private updateNearestPointToPipes(point: Point): void {
    let minDistance = 9999999;
    let nearestPointToPipes = point;

    this.level.edges.forEach((edge, edgeIndex) => {
      const nearestPointToCurrentPipe = getNearestPointToLine(
        point,
        [this.level.vertices[edge[0]], this.level.vertices[edge[1]]]
      );
      const distance = getDistance(point, nearestPointToCurrentPipe);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPointToPipes = nearestPointToCurrentPipe;
        this.edgeIndex = edgeIndex;
      }
    });

    this.nearestPointToPipes = nearestPointToPipes;
  }
}
