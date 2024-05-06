import { MaximumSpreadGameUi } from '../maximum-spread-game/maximum-spread-game-ui';

export function initEntryPointMarkButtons(
  pipesContainer: HTMLDivElement,
  placeStartPointButton: HTMLButtonElement,
  cancelPlaceStartPointButton: HTMLButtonElement,
  gameUi: MaximumSpreadGameUi
): void {
  const mouseMoveListenerForMark = (event: MouseEvent) => {
    gameUi.placeEntryPointMark(event.offsetX, event.offsetY);
  };

  const mouseOutListenerForMark = () => {
    gameUi.clearEntryPointMark();
  };

  const setState = (placeMode: boolean): void => {
    if (placeMode) {
      placeStartPointButton.classList.add('display-none');
      cancelPlaceStartPointButton.classList.remove('display-none');

      pipesContainer.addEventListener('mousemove', mouseMoveListenerForMark);
      pipesContainer.addEventListener('mouseout', mouseOutListenerForMark);
    } else {
      placeStartPointButton.classList.remove('display-none');
      cancelPlaceStartPointButton.classList.add('display-none');

      pipesContainer.removeEventListener('mousemove', mouseMoveListenerForMark);
      pipesContainer.removeEventListener('mouseout', mouseOutListenerForMark);
      gameUi.clearEntryPointMark();
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
