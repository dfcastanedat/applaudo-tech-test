import { Routes } from '@angular/router';
import { CharactersComponent } from '@pages/characters/characters.component';
import { ComicsComponent } from '@pages/comics/comics.component';
import { CharacterDetailComponent } from '@pages/character-detail/character-detail.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { StoriesComponent } from '@pages/stories/stories.component';
import {
  BASE_ROUTE,
  CHARACTERS_ROUTE,
  CHARACTER_DETAIL_ROUTE,
  COMICS_ROUTE,
  COMIC_DETAIL_ROUTE,
  SAVED_ITEMS_ROUTE,
  STORIES_ROUTE,
  STORIE_DETAIL_ROUTE,
} from '@utils/constants';
import { ComicDetailComponent } from '@pages/comic-detail/comic-detail.component';
import { StorieDetailComponent } from '@pages/storie-detail/storie-detail.component';
import { SavedItemsComponent } from '@pages/saved-items/saved-items.component';

export const ROUTES: Routes = [
  {
    path: BASE_ROUTE,
    component: LandingComponent,
  },
  {
    path: CHARACTERS_ROUTE,
    component: CharactersComponent,
  },
  {
    path: COMICS_ROUTE,
    component: ComicsComponent,
  },
  {
    path: STORIES_ROUTE,
    component: StoriesComponent,
  },
  {
    path: SAVED_ITEMS_ROUTE,
    component: SavedItemsComponent,
  },
  {
    path: `${CHARACTER_DETAIL_ROUTE}/:id`,
    component: CharacterDetailComponent,
  },
  {
    path: `${COMIC_DETAIL_ROUTE}/:id`,
    component: ComicDetailComponent,
  },
  {
    path: `${STORIE_DETAIL_ROUTE}/:id`,
    component: StorieDetailComponent,
  },
];
