import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../app.routes';
import { ApiKey } from '@interceptors/api-key.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { reducer } from '../ngrx/reducers/app.reducers';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['appState'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    StoreModule.forRoot(
      {
        appState: reducer,
      },
      { metaReducers }
    ),
  ],
  exports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    StoreModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKey,
      multi: true,
    },
  ],
})
export class CoreModule {}
