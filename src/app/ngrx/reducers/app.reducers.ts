import { IAppState } from '@utils/interfaces/app-state.interface';
import * as appActions from '../actions/app.actions';

const initialState: IAppState = {
  characters: [],
  comics: [],
  stories: [],
};

export function reducer(
  state: IAppState = initialState,
  action: appActions.Actions
): any {
  switch (action.type) {
    case appActions.ADD_CHARACTER:
      return { ...state, characters: [...state.characters, action.payload] };
    case appActions.REMOVE_CHARACTER:
      const charactersAux = [...state.characters];
      charactersAux.splice(action.payload, 1);
      console.table(charactersAux);
      return {
        ...state,
        characters: charactersAux,
      };
    case appActions.ADD_COMIC:
      return { ...state, comics: [...state.comics, action.payload] };
    case appActions.REMOVE_COMIC:
      const comicsAux = [...state.comics];
      comicsAux.splice(action.payload, 1);
      return {
        ...state,
        comics: comicsAux,
      };
    case appActions.ADD_STORIE:
      return { ...state, stories: [...state.stories, action.payload] };
    case appActions.REMOVE_STORIE:
      const storiesAux = [...state.stories];
      storiesAux.splice(action.payload, 1);
      return {
        ...state,
        stories: storiesAux,
      };
    default:
      return state;
  }
}
