import { MaximumSpreadGame } from './maximum-spread-game/maximum-spread-game';
import { MaximumSpreadGameUi } from './maximum-spread-game/maximum-spread-game-ui';
import { UiConfig } from './models/ui-config.interface';
import { initEntryPointMarkButtons } from './utils/init-entry-point-mark-buttons';

export function initUi(game: MaximumSpreadGame, {
  pipesContainer,
  placeStartPointButton,
  cancelPlaceStartPointButton
}: UiConfig): void {
  const maximumSpreadUi = new MaximumSpreadGameUi(game, pipesContainer);
  maximumSpreadUi.drawPipes();
  maximumSpreadUi.drawVerticesIndexes();

  initPipesContainer(pipesContainer);
  initEntryPointMarkButtons(
    pipesContainer,
    placeStartPointButton,
    cancelPlaceStartPointButton,
    maximumSpreadUi
  );
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
