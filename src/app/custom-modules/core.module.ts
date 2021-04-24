import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../app.routes';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), HttpClientModule],
  exports: [BrowserModule, RouterModule, HttpClientModule],
  providers: [],
})
export class CoreModule {}
