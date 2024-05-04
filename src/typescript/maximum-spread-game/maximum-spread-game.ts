import { Level } from './models/level';
import { PipeDirections } from './models/pipe-directions.enum';

export class MaximumSpreadGame {

  /** Width in meters */
  public readonly gameWidth = 40;

  /** Height in meters */
  public readonly gameHeight = 30;

  public readonly pipeWidth = 1;

  constructor(
    private readonly container: HTMLDivElement,
    private readonly level: Level,
  ) {
    this.drawPipes();
  }

  private drawPipes(): void {
    this.level.pipes.forEach((pipe) => {
      const pipeElement = document.createElement('div');
      pipeElement.classList.add('pipe');

      pipeElement.style.left = `${(pipe.head.x / this.gameWidth * 100)}%`;
      pipeElement.style.top = `${(pipe.head.y / this.gameHeight * 100)}%`;

      if (pipe.direction === PipeDirections.Down) {
        pipeElement.style.height = `${pipe.length / this.gameHeight * 100}%`;
      } else {
        pipeElement.style.width = `${pipe.length / this.gameWidth * 100}%`;
      }

      this.container.appendChild(pipeElement);
    });
  }
}
