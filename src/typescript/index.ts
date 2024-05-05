import { level0 } from './maximum-spread-game/constants/levels/level-0';
import { MaximumSpreadGame } from './maximum-spread-game/maximum-spread-game';

document.addEventListener('DOMContentLoaded', () => {
  const pipesContainer = document.querySelector<HTMLDivElement>('#pipes-container');
  if (pipesContainer) {
    window.addEventListener('resize', () => {
      updatePipesContainerSize(pipesContainer);
    });
    updatePipesContainerSize(pipesContainer);

    new MaximumSpreadGame(pipesContainer, level0);
  }
});

function updatePipesContainerSize(container: HTMLDivElement): void {
  const { innerWidth, innerHeight } = window;
  if (innerWidth * 3 / 4 < innerHeight) {
    container.style.width = '100%';
    container.style.height = 'unset';
  } else {
    container.style.width = 'unset';
    container.style.height = '100%';
  }
}
