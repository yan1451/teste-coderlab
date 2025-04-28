import { BaseError } from './base.error';

export class ConflictException extends BaseError {
  constructor(resource: string) {
    super(`${resource} already exists`, 409);
  }
}
