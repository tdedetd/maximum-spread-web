export function generateStartTarget(length: number): HTMLDivElement {
  const startTarget = document.createElement('div');
  startTarget.classList.add('start-target');

  const width = `${length}px`;
  startTarget.style.width = width;
  startTarget.style.height = width;
  return startTarget;
}
