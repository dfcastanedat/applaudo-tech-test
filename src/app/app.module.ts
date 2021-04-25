import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@custom-modules/core.module';
import { NavbarComponent } from './pages/components';
import { ComicsComponent } from './pages/comics/comics.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { InputComponent } from './pages/components/input/input.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { ButtonComponent } from './pages/components/button/button.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { LoadingComponent } from './pages/components/loading/loading.component';

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
    ItemDetailComponent,
    LoadingComponent,
  ],
  imports: [
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
