import { BaseError } from './base.error';

export class NotFoundError extends BaseError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}
