import { Graph } from '../models/geometry/graph.interface';
import { Point } from '../models/geometry/point.interface';
import { EntryPointDetails } from './entry-point-details';
import { MaximumSpreadGame } from './maximum-spread-game';

export class MaximumSpreadGameUi {
  private entryPointDetails: EntryPointDetails;

  private get level(): Graph {
    return this.game.level;
  }

  constructor(
    private readonly game: MaximumSpreadGame,
    private readonly container: HTMLDivElement
  ) {
    this.container.innerHTML = '';
    this.createMouseOverlay();
    this.entryPointDetails = new EntryPointDetails(40, this.game, this.container);
  }

  public clearEntryPointMark(): void {
    this.entryPointDetails.clear();
  }

  public drawVerticesIndexes(): void {
    this.level.vertices.forEach((vertex, index) => {
      const label = document.createElement('p');
      label.classList.add('vertex-index');
      label.innerText = String(index);
      label.style.left = `calc(${vertex.x / this.game.fieldWidth * 100}% + 6px)`;
      label.style.top = `calc(${vertex.y / this.game.fieldHeight * 100}% + 10px)`;
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
        pipeElement.style.left = `${(minX / this.game.fieldWidth * 100)}%`;
        pipeElement.style.top = `${(minY / this.game.fieldHeight * 100)}%`;
        pipeElement.style.width = `${(maxX - minX) / this.game.fieldWidth * 100}%`;
        pipeElement.style.height = `${(maxY - minY) / this.game.fieldHeight * 100}%`;

        this.container.appendChild(pipeElement);
      });
  }

  public placeEntryPointMark(offsetX: number, offsetY: number): void {
    this.entryPointDetails.placeMark(offsetX, offsetY);
  }

  private createMouseOverlay(): void {
    const overlay = document.createElement('div');
    overlay.classList.add('mousemove-overlay');
    this.container.appendChild(overlay);
  }
}
