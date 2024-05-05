export class MaximumSpreadError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'MaximumSpreadError';
  }
}
