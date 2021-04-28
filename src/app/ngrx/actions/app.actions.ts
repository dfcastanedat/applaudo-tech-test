import { Action } from '@ngrx/store';
import { IThumbnailItem } from '@utils/interfaces/thumbnail-item.interface';

export const ADD_CHARACTER = 'ADD_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const ADD_COMIC = 'ADD_COMIC';
export const REMOVE_COMIC = 'REMOVE_COMIC';
export const ADD_STORIE = 'ADD_STORIE';
export const REMOVE_STORIE = 'REMOVE_STORIE';

export class AddCharacterState implements Action {
  readonly type = ADD_CHARACTER;

  constructor(public payload: IThumbnailItem) {}
}

export class RemoveCharacterState implements Action {
  readonly type = REMOVE_CHARACTER;
  constructor(public payload: number) {}
}

export class AddComicState implements Action {
  readonly type = ADD_COMIC;
  constructor(public payload: IThumbnailItem) {}
}

export class RemoveComicState implements Action {
  readonly type = REMOVE_COMIC;
  constructor(public payload: number) {}
}

export class AddStorieState implements Action {
  readonly type = ADD_STORIE;
  constructor(public payload: IThumbnailItem) {}
}

export class RemoveStorieState implements Action {
  readonly type = REMOVE_STORIE;
  constructor(public payload: number) {}
}

export type Actions =
  | AddCharacterState
  | RemoveCharacterState
  | AddComicState
  | RemoveComicState
  | AddStorieState
  | RemoveStorieState;
