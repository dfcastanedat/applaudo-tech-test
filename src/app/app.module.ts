import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@custom-modules/core.module';
import { NavbarComponent, ThubnailItemComponent } from './pages/components';
import { ComicsComponent } from './pages/comics/comics.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { InputComponent } from './pages/components/input/input.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { ButtonComponent } from './pages/components/button/button.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { LoadingComponent } from './pages/components/loading/loading.component';
import { StorieDetailComponent } from './pages/storie-detail/storie-detail.component';
import { ComicDetailComponent } from './pages/comic-detail/comic-detail.component';
import { SavedItemsComponent } from './pages/saved-items/saved-items.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ComicsComponent,
    CharactersComponent,
    StoriesComponent,
    InputComponent,
    LandingComponent,
    ButtonComponent,
    CharacterDetailComponent,
    LoadingComponent,
    ThubnailItemComponent,
    StorieDetailComponent,
    ComicDetailComponent,
    SavedItemsComponent,
  ],
  imports: [
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
