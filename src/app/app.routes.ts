import { Routes } from '@angular/router';
import { CharactersComponent } from '@pages/characters/characters.component';
import { ComicsComponent } from '@pages/comics/comics.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { StoriesComponent } from '@pages/stories/stories.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'comics',
    component: ComicsComponent,
  },
  {
    path: 'stories',
    component: StoriesComponent,
  },
];
