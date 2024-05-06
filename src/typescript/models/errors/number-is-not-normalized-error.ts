export class NumberIsNotNormalizedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NumberIsNotNormalizedError';
  }
}
