import { MaximumSpreadGame } from './maximum-spread-game/maximum-spread-game';
import { UiConfig } from './models/ui-config.interfacel';

export function initUi(game: MaximumSpreadGame, {
  pipesContainer,
  placeStartPointButton,
  cancelPlaceStartPointButton
}: UiConfig): void {
  initPipesContainer(pipesContainer);
  initStartButtons(placeStartPointButton, cancelPlaceStartPointButton, game);

  game.drawPipes();
}

function initPipesContainer(pipesContainer: HTMLDivElement): void {
  window.addEventListener('resize', () => {
    updatePipesContainerSize(pipesContainer);
  });
  updatePipesContainerSize(pipesContainer);
}

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

function initStartButtons(
  placeStartPointButton: HTMLButtonElement,
  cancelPlaceStartPointButton: HTMLButtonElement,
  game: MaximumSpreadGame
): void {
  const setState = (placeMode: boolean): void => {
    if (placeMode) {
      placeStartPointButton.classList.add('display-none');
      cancelPlaceStartPointButton.classList.remove('display-none');
    } else {
      placeStartPointButton.classList.remove('display-none');
      cancelPlaceStartPointButton.classList.add('display-none');
    }
  };

  placeStartPointButton.addEventListener('click', () => {
    setState(true);
  });

  cancelPlaceStartPointButton.addEventListener('click', () => {
    setState(false);
  });

  setState(false);
}
