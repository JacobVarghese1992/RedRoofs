import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {routing, appRoutingProviders} from './app.routing';
import { AppComponent }  from './app.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import {ListingsComponent} from './components/listings/listings.component';
import { HttpModule } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import {ProfileComponent} from './components/profile/profile.component';

import {Auth} from './services/auth.service';

@NgModule({
  imports:      [ BrowserModule, routing, FormsModule, HttpModule, Ng2SmartTableModule],
  declarations: [ AppComponent, HomeComponent, ProfileComponent, ListingsComponent],
  bootstrap:    [ AppComponent ],
  providers: [
  	appRoutingProviders,
  	AUTH_PROVIDERS,
  	Auth
  ]
})
export class AppModule { }
