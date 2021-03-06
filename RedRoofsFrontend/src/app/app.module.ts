import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {routing, appRoutingProviders} from './app.routing';
import { AppComponent }  from './app.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import { HttpModule } from '@angular/http';
import {EntryComponent} from './components/entry/entry.component';
import {FavComponent} from './components/fav/fav.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FavoritePageComponent} from './components/favoritePage/favoritePage.component';

import {Auth} from './services/auth.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NouisliderModule } from 'ng2-nouislider';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {AuthGuard} from './auth.guard';
@NgModule({
  imports:      [ BrowserModule, routing, FormsModule, HttpModule, Ng2SmartTableModule,  NouisliderModule, MultiselectDropdownModule],
  declarations: [ AppComponent, HomeComponent,EntryComponent, ProfileComponent, FavComponent, FavoritePageComponent ],
  entryComponents: [FavComponent],
  bootstrap:    [ AppComponent ],
  providers: [
  	appRoutingProviders,
  	AUTH_PROVIDERS,
  	Auth,
    AuthGuard
  ]})
export class AppModule { }
