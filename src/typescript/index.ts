import { initUi } from './init-ui';
import { level0 } from './maximum-spread-game/constants/levels/level-0';
import { MaximumSpreadGame } from './maximum-spread-game/maximum-spread-game';

document.addEventListener('DOMContentLoaded', () => {
  const pipesContainer = document.querySelector<HTMLDivElement>('#pipes-container');
  const placeStartPointButton = document.querySelector<HTMLButtonElement>('#place-start-point-button');
  const cancelPlaceStartPointButton = document.querySelector<HTMLButtonElement>('#cancel-place-start-point-button');

  if (pipesContainer && placeStartPointButton && cancelPlaceStartPointButton) {
    const game = new MaximumSpreadGame(pipesContainer, level0);
    initUi(
      game,
      {
        pipesContainer,
        placeStartPointButton,
        cancelPlaceStartPointButton,
      }
    );
  }
});
