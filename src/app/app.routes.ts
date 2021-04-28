import { Routes } from '@angular/router';
import { CharactersComponent } from '@pages/characters/characters.component';
import { ComicsComponent } from '@pages/comics/comics.component';
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
import { SavedItemsComponent } from '@pages/saved-items/saved-items.component';
import { ItemDetailComponent } from '@pages/item-detail/item-detail.component';
import { ItemsMasterComponent } from '@pages/items-master/items-master.component';

export const ROUTES: Routes = [
  {
    path: BASE_ROUTE,
    component: LandingComponent,
  },
  {
    path: CHARACTERS_ROUTE,
    component: ItemsMasterComponent,
  },
  {
    path: COMICS_ROUTE,
    component: ItemsMasterComponent,
  },
  {
    path: STORIES_ROUTE,
    component: ItemsMasterComponent,
  },
  {
    path: SAVED_ITEMS_ROUTE,
    component: SavedItemsComponent,
  },
  {
    path: `${CHARACTER_DETAIL_ROUTE}/:id`,
    component: ItemDetailComponent,
  },
  {
    path: `${COMIC_DETAIL_ROUTE}/:id`,
    component: ItemDetailComponent,
  },
  {
    path: `${STORIE_DETAIL_ROUTE}/:id`,
    component: ItemDetailComponent,
  },
];
