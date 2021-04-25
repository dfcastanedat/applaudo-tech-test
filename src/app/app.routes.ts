import { Routes } from '@angular/router';
import { CharactersComponent } from '@pages/characters/characters.component';
import { ComicsComponent } from '@pages/comics/comics.component';
import { ItemDetailComponent } from '@pages/item-detail/item-detail.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { StoriesComponent } from '@pages/stories/stories.component';
import {
  BASE_ROUTE,
  CHARACTERS_ROUTE,
  COMICS_ROUTE,
  DETAIL_ROUTE,
  STORIES_ROUTE,
} from '@utils/constants';

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
    path: `${DETAIL_ROUTE}/:type/:id`,
    component: ItemDetailComponent,
  },
];
