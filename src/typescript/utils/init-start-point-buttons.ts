import { MaximumSpreadGameUi } from '../maximum-spread-game/maximum-spread-game-ui';

export function initStartPointButtons(
  pipesContainer: HTMLDivElement,
  placeStartPointButton: HTMLButtonElement,
  cancelPlaceStartPointButton: HTMLButtonElement,
  gameUi: MaximumSpreadGameUi
): void {
  const mouseMoveListenerForTarget = (event: MouseEvent) => {
    gameUi.placeStartTarget(event.offsetX, event.offsetY);
  };

  const mouseOutListenerForTarget = () => {
    gameUi.clearStartTarget();
  };

  const setState = (placeMode: boolean): void => {
    if (placeMode) {
      placeStartPointButton.classList.add('display-none');
      cancelPlaceStartPointButton.classList.remove('display-none');

      pipesContainer.addEventListener('mousemove', mouseMoveListenerForTarget);
      pipesContainer.addEventListener('mouseout', mouseOutListenerForTarget);
    } else {
      placeStartPointButton.classList.remove('display-none');
      cancelPlaceStartPointButton.classList.add('display-none');

      pipesContainer.removeEventListener('mousemove', mouseMoveListenerForTarget);
      pipesContainer.removeEventListener('mouseout', mouseOutListenerForTarget);
      gameUi.clearStartTarget();
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
