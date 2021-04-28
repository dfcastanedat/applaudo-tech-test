import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@custom-modules/core.module';
import { NavbarComponent, ThubnailItemComponent } from './pages/components';
import { InputComponent } from './pages/components/input/input.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { ButtonComponent } from './pages/components/button/button.component';
import { LoadingComponent } from './pages/components/loading/loading.component';
import { SavedItemsComponent } from './pages/saved-items/saved-items.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { ItemsMasterComponent } from './pages/items-master/items-master.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InputComponent,
    LandingComponent,
    ButtonComponent,
    LoadingComponent,
    ThubnailItemComponent,
    SavedItemsComponent,
    ItemDetailComponent,
    ItemsMasterComponent,
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
