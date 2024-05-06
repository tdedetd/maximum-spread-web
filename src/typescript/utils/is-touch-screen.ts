export function isTouchScreen(): boolean {
  return 'ontouchstart' in window;
}
