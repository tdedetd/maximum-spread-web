export function generateStartTarget(radius: number): HTMLDivElement {
  const startTarget = document.createElement('div');
  startTarget.classList.add('start-target');

  const width = `${radius * 2}px`;
  startTarget.style.width = width;
  startTarget.style.height = width;
  return startTarget;
}
