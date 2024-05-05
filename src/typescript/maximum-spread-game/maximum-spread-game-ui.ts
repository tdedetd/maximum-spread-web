import { Point } from '../models/geometry/point.interface';
import { generateStartTarget } from '../utils/generate-start-target';
import { MaximumSpreadGame } from './maximum-spread-game';

export class MaximumSpreadGameUi {
  private readonly startTargetRadius: number = 10;
  private startTarget: HTMLDivElement | null = null;

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

  public drawPipes(): void {
    const points = this.game.level.vertices;
    this.game.level.edges
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
      this.startTarget = generateStartTarget(this.startTargetRadius);
      this.container.appendChild(this.startTarget);
    }

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const xPercents = offsetX / width * 100;
    const yPercents = offsetY / height * 100;
    this.startTarget.style.left = `calc(${xPercents}% - ${this.startTargetRadius}px)`;
    this.startTarget.style.top = `calc(${yPercents}% - ${this.startTargetRadius}px)`;
  }

  private createMouseOverlay(): void {
    const overlay = document.createElement('div');
    overlay.classList.add('mousemove-overlay');
    this.container.appendChild(overlay);
  }
}
